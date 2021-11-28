const crypto = require('crypto')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const AuthService = require('../services/auth.service')
const AppError = require('../utils/app.errors')
const sendEmail = require('../utils/email')

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken = async (user, statusCode, res) => {
    const token = signToken(user._id)

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

    res.cookie('jwt', token, cookieOptions)

    // remove the password from output
    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        user,
    })
}

class AuthController {
    async signup(req, res, next) {
        try {
            const user = await AuthService.createOne(req.body)

            await createSendToken(user, 201, res)
        } catch (err) {
            next(err)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return next(new AppError('Please provide email and password', 400))
            }

            const user = await AuthService.login({ email })

            if (!user || !(await user.correctPassword(password, user.password))) {
                return next(new AppError('Incorrect email or password', 401))
            }

            await createSendToken(user, 200, res)
        } catch (err) {
            next(err)
        }
    }

    async protect(req, res, next) {
        try {
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                var token = req.headers.authorization.split(' ')[1]
            }

            if (!token) {
                return next(
                    new AppError(
                        'Your are not logged in. Please log in to get access',
                        401
                    )
                )
            }

            // Verification token
            const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

            const currentUser = await AuthService.getOneUser(decoded.id)

            if (!currentUser) {
                return next(
                    new AppError(
                        'The user belong to this token does no longer exist',
                        401
                    )
                )
            }

            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next(
                    new AppError('User recently changed password. Please try again', 401)
                )
            }

            req.user = currentUser

            next()
        } catch (err) {
            next(err)
        }
    }

    restrictTo(...roles) {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return next(
                    new AppError('You do not have permission to perform this action', 403)
                )
            }

            next()
        }
    }

    async forgotPassword(req, res, next) {
        try {
            const user = await AuthService.forgot({ email: req.body.email })

            if (!user) {
                return next(new AppError('There is no user with email address', 404))
            }

            const resetToken = user.createPasswordResetToken()

            await user.save({ validateBeforeSave: false })

            const resetURL = `${req.protocol}://${req.get(
                'host'
            )}/api/v1/users/reset/${resetToken}`

            const message = `Forgot your password? Submit a PATCH request with your new password and
      passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this
      email`

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Your password reset token (valid for 10 min)',
                    message,
                })

                res.status(200).json({
                    status: 'success',
                    message: 'Token sent to email',
                })
            } catch (err) {
                user.createPasswordResetToken = undefined
                user.passwordResetExpires = undefined
                await user.save({ validateBeforeSave: false })

                return next(
                    new AppError(
                        'There was an error sending the email. Try again later',
                        500
                    )
                )
            }
        } catch (err) {
            next(err)
        }
    }

    async resetPassword(req, res, next) {
        try {
            // 1. Get user based on the token
            const hashedToken = crypto
                .createHash('sha256')
                .update(req.params.token)
                .digest('hex')

            const user = await AuthService.reset({
                passwordResetToken: hashedToken,
                passwordResetExpires: { $gt: Date.now() },
            })

            // 2. If token has not expired, and there is user, set the new password
            if (!user) {
                return next(new AppError('Token is invalid or has expired', 400))
            }

            user.password = req.body.password
            user.passwordConfirm = req.body.passwordConfirm
            user.passwordResetToken = undefined
            user.passwordResetExpires = undefined

            await user.save()

            // 3. Update changedPasswordAt for the user

            // 4. Log the user in, send JWT
            await createSendToken(user, 200, res)
        } catch (err) {
            next()
        }
    }

    async updatePassword(req, res, next) {
        try {
            // 1. get user from collection
            const user = await AuthService.update(req.user.id)

            // 2. check if posted current password is correct
            if (
                !(await user.correctPassword(req.body.passwordCurrent, user.password))
            ) {
                return next(new AppError('Your current password is wrong', 401))
            }

            // 3. if so, update password
            user.password = req.body.password
            user.passwordConfirm = req.body.passwordConfirm

            await user.save()
            // User.findByIdAndUpdate will NOT work as intended!

            // 4. log user in, send JWT
            await createSendToken(user, 200, res)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new AuthController()

const crypto = require('crypto')
const { Schema, model } = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please, provide your name'],
    },
    email: {
        type: String,
        required: [true, 'Please, provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please, provide valid email'],
    },
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Please, provide your password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please, confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Password are not the same',
        },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
    },
    photo: {
        type: String,
        default: true,
        select: false,
    },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)

    this.passwordConfirm = undefined

    next()
})

// userSchema.pre('save', function (next) {
//   if (!this.isModified('password') || this.isNew) return next()
//
//   this.passwordChangedAt = Date.now() - 1000
//
//   next()
// })

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } })

    next()
})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changesPasswordAfter = function (JWTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 100,
            10
        )

        return JWTimestamp < changedTimestamp
    }

    return false
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    console.log({ resetToken }, this.passwordResetToken)

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}

module.exports = model('User', userSchema)

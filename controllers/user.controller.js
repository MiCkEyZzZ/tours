const UserService = require('../services/user.service')
const AppError = require('../utils/app.errors')
const operationsFactory = require('../handlers/operations')

const filterObj = (obj, ...allowedFields) => {
    const newObj = {}

    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el]
    })

    return newObj
}

class UserController {
    getAllUsers = operationsFactory.getAll(UserService)

    getUser = operationsFactory.getOne(UserService)

    updateUser = operationsFactory.updateOne(UserService)

    deleteUser = operationsFactory.deleteOne(UserService)

    async updateCurrentUser(req, res, next) {
        try {
            // 1. create error if user posts password data
            if (req.body.password || req.body.passwordConfirm) {
                return next(new AppError('This route is not for password updates. Please use update password', 400))
            }

            // 2. Filtered out unwanted fields names that are not allowed to be updated
            const filteredBody = filterObj(req.body, 'name', 'email')

            // 3. update user document
            const user = await UserService.updateCurrentUser(req.user.id, filteredBody, {
                new: true,
                runValidators: true
            })

            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async deleteCurrentUser(req, res, next) {
        try {
            await UserService.deleteCurrentUser(req.user.id, { active: false })

            res.status(204).json({
                status: 'success',
                data: null
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UserController()

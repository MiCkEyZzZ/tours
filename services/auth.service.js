const User = require('../models/user.model')

class AuthService {
    async createOne(user) {
        const createUser = await User.create({ ...user })

        return createUser
    }

    async login(email) {
        const user = await User.findOne(email).select('+password')

        return user
    }

    async getOneUser(id) {
        const user = User.findById(id)

        return user
    }

    async forgot(email) {
        const user = User.findOne(email)

        return user
    }

    async reset(token) {
        const user = User.findOne(token)

        return user
    }

    async update(id) {
        const user = await User.findById(id).select('+password')

        return user
    }
}

module.exports = new AuthService()

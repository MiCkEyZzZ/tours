const User = require('../models/user.model')

class UserService {
    getAll() {
        const users = User.find()

        return users
    }

    async getOne(id) {
        const user = await User.findById(id)

        return user
    }

    async updateOne(id, body) {
        const review = await User.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        return review
    }

    async deleteOne(id) {
        const user = await User.findByIdAndDelete(id)

        return user
    }

    async updateCurrentUser(id, filteredBody, valid) {
        const user = User.findByIdAndUpdate(id, filteredBody, valid)

        return user
    }

    async deleteCurrentUser(id, active) {
        const user = await User.findByIdAndUpdate(id, active)

        return user
    }
}

module.exports = new UserService()

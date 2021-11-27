const Review = require('../models/review.model')

class ReviewService {
    getAll(filter) {
        const reviews = Review.find(filter)

        return reviews
    }

    async getOne(id) {
        const review = await Review.findById(id)

        return review
    }

    async createOne(review) {
        const createReview = await Review.create(review)

        return createReview
    }

    async updateOne(id, body) {
        const review = await Review.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        return review
    }

    async deleteOne(id) {
        const review = Review.findByIdAndDelete(id)

        return review
    }
}

module.exports = new ReviewService()

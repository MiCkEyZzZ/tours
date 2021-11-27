const ReviewService = require('../services/review.service')
const operationsFactory = require('../handlers/operations')

exports.getAllReviews = operationsFactory.getAll(ReviewService)

exports.getReview = operationsFactory.getOne(ReviewService)

exports.createReview = operationsFactory.createOne(ReviewService)

exports.updateReview = operationsFactory.updateOne(ReviewService)

exports.deleteReview = operationsFactory.deleteOne(ReviewService)

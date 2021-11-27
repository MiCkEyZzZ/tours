const { Schema, model } = require('mongoose')
const Tour = require('./tour.model')

const reviewSchema = new Schema(
    {
        review: {
            type: String,
            required: [true, 'A review can not be empty'],
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        tour: {
            type: Schema.ObjectId,
            ref: 'Tour',
            required: [true, 'A review must belong to a tour'],
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User',
            required: [true, 'A review must belong to a user'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

reviewSchema.pre(/^find/, function (next) {
    // this.populate({
    //   path: 'tour',
    //   select: 'name'
    // }).populate({
    //   path: 'user',
    //   select: 'name photo'
    // })
    //
    // next()

    this.populate({
        path: 'user',
        select: 'name photo',
    })

    next()
})

reviewSchema.statics.calcAverageRatings = async function (tourId) {
    const stats = await this.aggregate([
        {
            $match: { tour: tourId },
        },
        {
            $group: {
                _id: '$tour',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' },
            },
        },
    ])

    console.log(stats)

    await Tour.findByIdAndUpdate(tourId, {
        ratingsQuantity: stats[0].nRating,
        ratingsAverage: stats[0].avgRating,
    })
}

reviewSchema.post('save', function () {
    // this points to current review
    this.constructor.calcAverageRatings(this.tour)
})

reviewSchema.pre(/^findOneAnd/, async function (next) {
    const r = await this.findOne()

    console.log(r)
})

module.exports = model('Review', reviewSchema)

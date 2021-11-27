const Tour = require('../models/tour.model')

class TourService {
    getAll() {
        const tours = Tour.find()

        return tours
    }

    async getOne(id) {
        const tour = await Tour.findById(id).populate('reviews')

        return tour
    }

    async createOne(tour) {
        const createdTour = await Tour.create(tour)

        return createdTour
    }

    async updateOne(id, body) {
        const updatedTour = await Tour.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        return updatedTour
    }

    async deleteOne(id) {
        const tour = await Tour.findByIdAndDelete(id)

        return tour
    }

    async getOneSlug(slug) {
        const tour = await Tour.findOne(slug).populate({
            path: 'reviews'
        })

        return tour
    }

    async getTourStats() {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5}}
            },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' },
                    numTours: { $sum: 1 },
                    numRating: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                }
            },
            {
                $sort: { avgPrice: 1 }
            },
            {
                $match: { _id: { $ne: 'EASY' } }
            }
        ])

        return stats
    }

    async getMonthPlan(year) {
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStarts: { $sum: 1 },
                    tours: { $push: '$name' }
                }
            },
            {
                $addFields: { month: '$_id'}
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: { numberTourStarts: -1 }
            },
            {
                $limit: 12
            }
        ])

        return plan
    }
}

module.exports = new TourService()

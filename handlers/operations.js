const AppError = require('../utils/app.errors')
const ApiFeatures = require('../utils/api.features')

class OperationsFactory {
    getAll(Service) {
        return async (req, res, next) => {
            try {
                // To allow for nested GET reviews on tour (hack)
                let filter = {}
                if (req.params.tourId) filter = { tour: req.params.tourId }

                const features = new ApiFeatures(Service.getAll(filter), req.query)
                    .filter()
                    .sort()
                    .limitFields()
                    .paginate()

                // const doc = await features.query.explain()
                const doc = await features.query

                res.status(200).json({
                    count: doc.length,
                    doc,
                })
            } catch (err) {
                next(err)
            }
        }
    }

    getOne(Service) {
        return async (req, res, next) => {
            try {
                const { id } = req.params
                const doc = await Service.getOne(id)

                if (!doc) {
                    return next(
                        new AppError(`Document with this ID ${doc.id} not found`, 404)
                    )
                }

                res.status(200).json({
                    doc,
                })
            } catch (err) {
                next(err)
            }
        }
    }

    createOne(Service) {
        return async (req, res, next) => {
            try {
                const doc = await Service.createOne(req.body)

                res.status(200).json({
                    status: 'success',
                    data: {
                        data: doc,
                    },
                })
            } catch (err) {
                next(err)
            }
        }
    }

    updateOne(Service) {
        return async (req, res, next) => {
            try {
                const { id } = req.params
                const { body } = req

                const doc = await Service.updateOne(id, body)

                if (!doc) {
                    return next(
                        new AppError(`Document with this ID: ${doc.id} not found`, 404)
                    )
                }

                res.status(200).json({
                    status: 'success',
                    data: {
                        data: doc,
                    },
                })
            } catch (err) {
                next(err)
            }
        }
    }

    deleteOne(Service) {
        return async (req, res, next) => {
            try {
                const { id } = req.params
                const doc = await Service.deleteOne(id)

                if (!doc) {
                    return next(
                        new AppError(`Document with this ID: ${doc.id} not found`, 404)
                    )
                }

                res.status(204).json({
                    status: 'success',
                    data: null,
                })
            } catch (err) {
                next(err)
            }
        }
    }
}

module.exports = new OperationsFactory()

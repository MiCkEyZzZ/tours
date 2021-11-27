const TourService = require('../services/tour.service')
const operationsFactory = require('../handlers/operations')

exports.getAllTours = operationsFactory.getAll(TourService)

exports.getTour = operationsFactory.getOne(TourService)

exports.createTour = operationsFactory.createOne(TourService)

exports.updateTour = operationsFactory.updateOne(TourService)

exports.deleteTour = operationsFactory.deleteOne(TourService)

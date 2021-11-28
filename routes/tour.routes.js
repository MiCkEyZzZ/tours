const { Router } = require('express')

const router = Router()

const authController = require('../controllers/auth.controller')
const reviewRoutes = require('./review.routes')
const {
    createTour,
    getTour,
    updateTour,
    deleteTour,
    getAllTours,
} = require('../controllers/tour.controller')

router.use('/:tourId/reviews', reviewRoutes)

router.get('/', getAllTours)

router.post(
    '/',
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    createTour
)

router.get('/:id', getTour)

// router.get('/:slug',
//   tourController.getTourSlug
//
// )

router.patch(
    '/:id',
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    updateTour
)

router.delete(
    '/:id',
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour
)

module.exports = router

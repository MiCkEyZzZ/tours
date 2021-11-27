const { Router } = require('express')

const router = Router({ mergeParams: true })

const authController = require('../controllers/auth.controller')
const setTourUserId = require('../middlewares/review.middleware')
const {
    getAllReviews,
    getReview,
    updateReview,
    deleteReview,
    createReview,
} = require('../controllers/review.controller')

router.use(authController.protect)

router.get('/', getAllReviews)
router.get('/:id', getReview)
router.patch('/:id', authController.restrictTo('user', 'admin'), updateReview)

router.delete('/:id', authController.restrictTo('user', 'admin'), deleteReview)

router.post('/', authController.restrictTo('user'), setTourUserId, createReview)

module.exports = router

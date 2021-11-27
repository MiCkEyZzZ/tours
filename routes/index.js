const { Router } = require('express')

const router = Router()

const toursRoutes = require('./tour.routes')
const userRoutes = require('./user.routes')
const reviewRoutes = require('./review.routes')

router.use('/tours', toursRoutes)
router.use('/users', userRoutes)
router.use('/reviews', reviewRoutes)

module.exports = router

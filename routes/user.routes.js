const { Router } = require('express')

const router = Router()

const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')
const getCurrentUser = require('../middlewares/currentUser.middleware')

// all routes authenticating
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgot', authController.forgotPassword)
router.patch('/reset/:token', authController.resetPassword)

// protect all routes after this middleware
router.use(authController.protect)

router.patch('/update', authController.updatePassword)
router.get('/current', getCurrentUser, userController.getUser)
router.patch('/updateCurrent', userController.updateCurrentUser)
router.delete('/deleteCurrent', userController.deleteCurrentUser)

router.use(authController.restrictTo('admin'))

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router

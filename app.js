const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const cors = require('cors')
const AppError = require('./utils/app.error')
const globalErrorHandler = require('./middlewares/error.middleware')
const router = require('./routes/index')

const app = express()

// GLOBAL MIDDLEWARE
// set security HTTP headers
app.use(helmet())

// developing logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// limit request from same aip
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'To many requests from this IP, please try again in an hour.',
})

app.use('/api', limiter)

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))

// data sanitization against NoSQL query injection
app.use(mongoSanitize())

// data sanitization against XSS
app.use(xss())

// prevent parameter pollution
app.use(
    hpp({
        whiteList: [
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroupSize',
            'difficulty',
            'price',
        ],
    })
)

app.use(cors())

// serving static files
app.use(express.static(`${__dirname}/images`))

// test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    // console.log(req.headers)
    next()
})

// routes
app.use('/api/v1', router)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

module.exports = app

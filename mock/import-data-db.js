const fs = require('fs')
const colors = require('colors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Tour = require('../models/tour.model')
const Review = require('../models/review.model')
const User = require('../models/user.model')

dotenv.config({ path: './.env' })

const DB_URL = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))
const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
)

const importDataToDb = async () => {
    try {
        await Tour.create(tours)
        await Review.create(reviews)
        await User.create(users)
        console.log('Data Imported...'.green.inverse)
    } catch (err) {
        console.log(err)
    }

    process.exit()
}

const deleteDataFromDb = async () => {
    try {
        await Tour.deleteMany()
        await Review.deleteMany()
        await User.deleteMany()
        console.log('Data Destroyed...'.red.inverse)
    } catch (err) {
        console.log(err)
    }

    process.exit()
}

if (process.argv[2] === '-i') {
    importDataToDb()
} else if (process.argv[2] === '-d') {
    deleteDataFromDb()
}

const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './.env' })
const app = require('./app')

const DB_URL = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)

const PORT = process.env.PORT || 8080

async function start () {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        app.listen(PORT, () => {
            console.log(
                '\x1b[34m%s\x1b[0m',
                `
        ${app.get('env').toUpperCase()}
        Rest:      http://localhost:${PORT}/api/
        Database:  ${mongoose.connection.host}/${mongoose.connection.name}
        `
            )
        })
    } catch (err) {
        console.error(err.name, err.message)
        console.log('UNHANDLED REJECTION! Shutting down...')
        process.exit(1)
    }
}

start()

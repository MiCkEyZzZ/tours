// const AppError = require("./../utils/appErrors")
//
// const handleCastErrorDB = err => {
//   const message = `Invalid ${err.path}: ${err.value}.`
//
//   return new AppError(message, 400)
// }
//
// const handleDuplicateFieldsDB = err => {
//   const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
//   const message = `Duplicate fields value: ${value}. Please use another value!`
//
//   return new AppError(message, 400)
// }
//
// const sendErrorDev = (err, res) => {
//   res.status(err.statusCode).json({
//     status: err.status,
//     error: err.status,
//     message: err.message,
//     stack: err.stack,
//   })
// }
//
// const sendErrorProduction = (err, res) => {
//   if (err.isOperational) {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//     })
//   } else {
//     console.error('ERROR', err)
//
//     res.status(500).json({
//       status: 'error',
//       message: 'Something went wrong!',
//     })
//   }
// }
//
// module.exports = { sendErrorDev, sendErrorProduction, handleCastErrorDB, handleDuplicateFieldsDB }

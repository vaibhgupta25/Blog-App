// res.status(errorStatusCode).json({message}) 
// to get rid from writing this syntax again and again we use error custom error handler
// to trigger the custom error handler we need to pass the error in the next function

const errorResponseHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack   // to get the location of the error
    })
}

const invalidPathHandler = (req, res, next) => {
    const error = new Error("Invalid Path");
    error.statusCode = 404
    next(error)
}

module.exports = { errorResponseHandler, invalidPathHandler } 
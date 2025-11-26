const errorMidleware = (err, req, res, next) => {
    try {
        let error = err.message;
        console.error(error)

        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message)
            error.statusCode = 404
        }

        // mongoose duplicate error
        if (err.code === 11000) {
            const message = 'Duplicate field value'
            error = new Error(message)
            error.statusCode = 400;
        }
        // mongo validation err
        if (err.name == 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message)
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server error' })
    } catch (err) {
        next(err)
    }
}

export default errorMidleware;
// Error handler class

class ErrorHandler extends Error{
    // Note that in the above class Error is the parent class of ErrorHandler
    // ErrorHandler is using inheritance to get props from Error
    constructor(message, statusCode){
        super(message)
        // super represents the Error class constructor
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)
    }
    
}
module.exports = ErrorHandler
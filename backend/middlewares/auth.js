// Check if user is authenticated or not
const User = require('../model/user')
const jwt = require("jsonwebtoken");
const user = require("../model/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticatedUser = catchAsyncError( async(req, res, next) => {

    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler('Login first to access this resource', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await user.findById(decoded.id)
    next()
    
})

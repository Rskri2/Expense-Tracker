const AppError = require('../utils/AppError');
const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};
  
const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};
  
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    
    const message = `Invalid input data. ${errors.join('.')}`;
    return new AppError(message, 400);
  };
  
  const handleJWTError = err =>{
    
    new AppError('Invalid token. Please log in again!', 401);
  }
  
  const handleJWTExpiredError = err =>{
    
    new AppError('Your token has expired! Please log in again.', 401);
  }
  
  const sendErrorProd = (err, req, res) => {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        title: 'Something went wrong!',
        message: err.message
      });
    }
    
    return res.status(500).json({
      title: 'Something went wrong!',
      message: 'Please try again later'
    });
  };
  
  module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
      let error = { ...err };
      console.log(error)
      error.message = err.message;
      if (error && error.name === 'CastError') error = handleCastErrorDB(error);
      if (error && error.code === 11000) error = handleDuplicateFieldsDB(error);
      if (error && error.name === 'ValidationError')
        error = handleValidationErrorDB(error);
      if (error && error.name === 'JsonWebTokenError') error = handleJWTError();
      if (error && error.name === 'TokenExpiredError') error = handleJWTExpiredError();
  
      sendErrorProd(error, req, res);
      next();
  };
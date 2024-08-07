const express = require('express');
const router = express.Router();
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync')
const getinfo  = (req,res, next) =>{
  res.status(200).json({
    status:'success',
    data:'Welcome to the expense tracker app'
})
}
router
  .route('/')
  .get(getinfo);
  module.exports = router;
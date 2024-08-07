const mongoose = require('mongoose');
const Income = require('../model/Income');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createIncCtrl = catchAsync(async (req, res, next) => {
  const { title, amount, description, category, date } = req.body.income
    ? req.body.income
    : req.body;

  const id = req.user.id;
  const income = await Income.create({
    title,
    amount,
    date,
    category,
    description,
    user: id,
  });

  res.status(200).json({
    status: 'sucess',
    data: income,
  });
});

exports.getIncome = catchAsync(async (req, res, next) => {
  const income = await Income.find({ user: req.user.id });
  if (!income)
    return next(
      new AppError('There is no income associated with this user', 404)
    );

  res.status(200).json({
    status: 'success',
    data: income,
  });
});

exports.getAllIncome = catchAsync(async (req, res, next) => {
  const { page } = req.query;
  const incomes = await Income.paginate(
    {},
    { limit: 10, page: Number(page), populate: 'user' }
  );
  if (!incomes)
    return next(new AppError('There is no data in this field', 404));
  res.status(200).json({
    size: incomes.length,
    status: 'success',
    data: incomes,
  });
});

exports.updateIncome = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const income = await Income.findById(id);
  if (!income) return next(new AppError('The information is wrong'));
  const newIncome = await Income.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
    data: newIncome,
  });
});

exports.deleteIncome = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const income = await Income.findById(id);
  if (!income) return next(new AppError('The information is wrong'));
  await Income.findByIdAndDelete(id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

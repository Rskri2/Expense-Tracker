const mongoose = require('mongoose');
const mongoosepaginate = require('mongoose-paginate-v2')
const Expense = require('../../model/Expense');
const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../utils/AppError');
exports.createExpCtrl = catchAsync((async(req, res,next) =>{

    let {title,amount,description,category,date,type} = req.body.expense ? req.body.expense : req.body;
    const id = req.user.id;
    const expense = await Expense.create({
        title,
        description,
        amount,
        type,
        category,
        date,
        user:id
    })
    
    res.status(200).json({
        status:'sucess',
        data:expense
    });

}))

exports.getExpenses = catchAsync((async(req, res, next) => {

    const expense = await Expense.find({ user:req.user.id });
   
    if(!expense)return next(new AppError('There is no expense associated with this user',404));

    res.status(200).json({
        status:'success',
        data:expense
    })

}))

exports.getAllExpenses = catchAsync((async(req, res, next) => {
    const {page} = req.query
    const expenses = await Expense.paginate({},{limit : 10, page:Number(page),populate:'user'});
        if(!expenses)return next(new AppError('There is no data in this field',404));
        res.status(200).json({
            size:expenses.length,
            status:'success',
            data:expenses
        })

}))

exports.updateExpenses = catchAsync(async(req, res, next) => {

    const id = req.params.id;
    const expense = await Expense.findById(id);
    if(!expense)return next(new AppError('The information is wrong'));
    const newExpense = await Expense.findByIdAndUpdate(id,req.body,{
        new:true
    })
    res.status(200).json({
        status:'success',
        data:newExpense
    })
})

exports.deleteExpenses = catchAsync(async(req, res, next) => {

    const id = req.params.id;
    const expense = await Expense.findById(id);
    if(!expense)return next(new AppError('The information is wrong'));
     await Expense.findByIdAndDelete(id)
    res.status(204).json({
        status:'success',
        data:null
    })
    
})
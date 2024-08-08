const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require(`${__dirname}/routes/usersRoutes`); 
const incomeRouter = require(`${__dirname}/routes/incomeRoutes`); 
const expensesRouter = require(`${__dirname}/routes/expensesRoutes`);
const errorControllers = require(`${__dirname}/controllers/errorCtrl`);
const AppError = require(`${__dirname}/utils/AppError`);
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DB =process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);

const dbConnect = async() => {
  try{
   const con = await mongoose.connect(DB)
    console.log("db connected")
  } catch(err){
    console.log(err.message);
    }
  }
dbConnect();

app.use('/api/v1/users', userRouter);
app.use('/api/v1/income', incomeRouter);
app.use('/api/v1/expenses', expensesRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} not found on this site`, 404));
});

app.use(errorControllers)
module.exports = app;

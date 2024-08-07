const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/usersRoutes');
const incomeRouter = require('./routes/incomeRoutes');
const expensesRouter = require('./routes/expensesRoutes');
const appRouter = require('./routes/appRoutes');


const AppError = require('./utils/AppError');
const errorControllers = require('./controllers/errorCtrl');
const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.set('view engine', 'pug');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', 'pug');

const DB =process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);

const dbConnect = async() => {
  try{
    await mongoose.connect(DB)
    console.log("db connected")
  } catch(err){
    console.log(err);
    }
  }
dbConnect();

module.exports = dbConnect;
app.use('/', appRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/income', incomeRouter);
app.use('/api/v1/expenses', expensesRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} not found on this site`, 404));
});

app.use(errorControllers);
module.exports = app;

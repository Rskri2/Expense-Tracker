const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users/usersRoutes');
const incomeRouter = require('./routes/income/incomeRoutes');
const expensesRouter = require('./routes/expenses/expensesRoutes');
const appRouter = require('./routes/expenses/appRoutes')
const dbConnect = require('./config/dbConnect');

const AppError = require("../utils/AppError");
const errorControllers = require('../src/controllers/error/errorCtrl');
const app = express();

app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}))

app.set('view engine','pug');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false }))
app.use(express.static(path.join(__dirname,'public')));
app.set('views','pug');

dbConnect();

app.use('/', appRouter)
app.use('/api/v1/users', userRouter);
app.use('/api/v1/income',incomeRouter);
app.use('/api/v1/expenses',expensesRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} not found on this site`, 404));
    
});

app.use(errorControllers)
module.exports = app;

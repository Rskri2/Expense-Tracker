const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesCtrl');
const userController = require('../controllers/usersCtrl');

router
  .route('/')
  .get(
    userController.protect,
    userController.restrictTo,
    expensesController.getAllExpenses
  );
router
  .route('/my-expenses')
  .get(userController.protect, expensesController.getExpenses)
  .post(userController.protect, expensesController.createExpCtrl);
router
  .route('/my-expenses/:id')
  .patch(userController.protect, expensesController.updateExpenses)
  .delete(userController.protect, expensesController.deleteExpenses);
module.exports = router;

const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeCtrl');
const userController = require('../controllers/usersCtrl');

router
  .route('/')
  .get(
    userController.protect,
    userController.restrictTo,
    incomeController.getAllIncome
  );
router
  .route('/my-incomes')
  .get(userController.protect, incomeController.getIncome)
  .post(userController.protect, incomeController.createIncCtrl);
router
  .route('/my-incomes/:id')
  .patch(userController.protect, incomeController.updateIncome)
  .delete(userController.protect, incomeController.deleteIncome);
module.exports = router;
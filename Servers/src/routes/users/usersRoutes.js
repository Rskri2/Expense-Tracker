const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/usersCtrl');

router
  .route('/')
  .get(
    userController.protect,
    userController.restrictTo,
    userController.fetchUser
  );
router.route('/login').post(userController.loginUser);
router.route('/logout').get(userController.protect, userController.logout);
router.route('/register').post(userController.registerUser);
router.route('/me').get(userController.protect,userController.myAccount);
router
  .route('/:id')
  .patch(userController.updateMe)
  .delete(userController.deleteMe);

module.exports = router;

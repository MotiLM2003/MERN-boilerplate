const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const {
  addUser,
  initLogin,
  getAllUsers,
  logOut,
  logOutAll,
  validateToken,
  updateById,
  saveUser,
} = require('../controllers/userController');

router.post('/login', initLogin);
router.post('/validateToken', validateToken);

router.post('/', addUser);
router.get('/', auth, getAllUsers);
router.post('/logout', auth, logOut);
router.post('/logoutAll', auth, logOutAll);
router.post('/save-user/', auth, saveUser);
module.exports = router;

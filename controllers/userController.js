const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const addUser = async (req, res) => {
  const use = new User(req.body);
  try {
    const user = await use.save();
    res.status(201).send(user);
  } catch (err) {
    console.log('err', err);
    res.send(err);
  }
};

const initLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res
      .status(202)
      .cookie('admin-token', token, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 1000 * 1000),
      })
      .send({ user, token });
  } catch (error) {
    res
      .status(400)
      .send({ message: 'could validata credentials admin', error });
  }
};

const validateToken = async (req, res) => {
  try {
    const token = req.body.token;

    const decoded = jwt.verify(token, 'thisismylife');
    const user = await User.findOne({ id: decoded.id, 'tokens.token': token });
    res.send(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const logOut = async ({ user, token }, res) => {
  try {
    user.tokens = user.tokens.filter((temp) => temp.token !== token);
    await user.save();
    res.status(202).send({ 'message': 'logged out' });
  } catch (error) {
    res.send('error' + error);
  }
};

const logOutAll = async ({ user, token }, res) => {
  try {
    user.tokens = user.tokens.filter((temp) => false);
    await user.save();
    res.status(202).send({ 'message': 'logged out' });
  } catch (error) {
    res.send('error' + error);
  }
};

const saveUser = async (req, res) => {
  const { _id, update } = req.body;

  if (parseInt(_id) === 0) {
    delete update._id;
    try {
      const use = new User(update);
      const user = await use.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send({ error });
    }
  } else {
    const data = await User.findByIdAndUpdate(_id, update);
    res.json(data);
  }
};

const updateById = async ({ body }, res) => {
  const { _id, update } = body;
  const data = await User.findByIdAndUpdate(_id, update);
  res.json(data);
};

module.exports = {
  addUser,
  initLogin,
  getAllUsers,
  logOut,
  logOutAll,
  validateToken,
  updateById,
  saveUser,
};

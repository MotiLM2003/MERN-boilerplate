const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: '', trim: true },
    lastName: { type: String, default: '', trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    userName: { type: String, required: true, trim: true },
    userPassword: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: false },
    idNumber: { type: String, default: '', trim: true },
    adress: { type: String, default: '', trim: true },
    role: { type: { type: String, default: 'user', trim: true } },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('customers', {
  ref: 'Customer',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.__v;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() }, 'thisismylife', {
    expiresIn: '365 days',
  });
  try {
    user.tokens = user.tokens.concat({ token });
    user.save();
  } catch (error) {}
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const filters = { email, userPassword: password };
  const user = await User.findOne(filters);

  if (!user || user === null) {
    return { message: 'unable to log in email' };
  }

  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('userPassword')) {
    // user.userPassword = await bcrypt.hash(user.userPassword, 8);
  }
  next();
});

const User = mongoose.model('Users', userSchema);
module.exports = User;

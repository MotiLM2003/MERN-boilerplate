// const connection =
//   'mongodb+srv://moti:data3enterWordpress@cluster0.7tihz.mongodb.net/data-center?retryWrites=true&w=majority';
const connection = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/labs';
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true,
  keepAlive: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  useFindAndModify: false,
  useUnifiedTopology: true,
};
mongoose.connect(
  connection,
  options,

  () => {
    console.log('connected to database');
  }
);

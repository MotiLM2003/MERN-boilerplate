const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter');
const refreshRouter = require('./routers/refreshRouter');
const router = new express.Router();
require('./db/mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const origin = process.env.ORIGIN || 'http://localhost:3000';

app.use(
  cors({
    credentials: true,
    origin: origin,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/refresh/', refreshRouter);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`listenting at port ${PORT}`);
});

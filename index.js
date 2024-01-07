const express = require('express');
const morgan = require('morgan');
const connectdb = require('./db/connectDb');
const userRouter = require('./routes/user.routes');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        msg: "Working"
    });
});

app.use('/users', userRouter)

app.use("*", (req, res) => {
    res.send({
      code: 400,
      message: "API not found"
    });
  });


async function start() {

    await connectdb();

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

}






start();
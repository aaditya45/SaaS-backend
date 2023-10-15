const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
require('express-async-errors');
require('dotenv').config();

process.on("uncaughtException", (err) => {
    console.log(err.message);
    console.log(`Server is shutting down due to uncaught exception`);
    process.exit(1);
  }
);
  

app.use(express.json());
app.use(cookieParser());

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

mongoose.set("strictQuery", true);

const connectDB = require('./db/connect');

const userRouter = require('./routes/userRouter');
const communityRouter = require('./routes/communityRouter');
const roleRouter = require('./routes/roleRouter');
const memberRouter = require('./routes/memberRouter');

app.use('/v1/auth', userRouter);
app.use('/v1/role', roleRouter);
app.use('/v1/member', memberRouter);
app.use('/v1/community', communityRouter);
app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        const server = app.listen(port, () => {
            console.log(`Server running on port : ${port}`);
          });
    } catch (err) {
        console.log(err);
    }
}

start();
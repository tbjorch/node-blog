import express from 'express';
import mongoose from 'mongoose';
import postRouter from './Post/routes';
import userRouter from './User/routes';
import authRouter from './auth/routes';
import { errorHandler } from './utils/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// Pre route middlewares
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use("/posts/", postRouter);
app.use("/users/", userRouter);
app.use("/auth/", authRouter);

// Error handlers
app.use(errorHandler);

mongoose.connect(process.env.MONGODB, () => {
  app.listen(port, () => console.log(`Application running on port ${port}`));
});
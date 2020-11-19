import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import postRouter from './Post/routes';
import userRouter from './User/routes';
import { errorHandler } from './utils/errorHandler';
import { HttpError } from './utils/errors/http';

const app = express();
const port = 3000;

// Pre route middlewares
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use("/posts/", postRouter);
app.use("/users/", userRouter);

// Error handlers
app.use(errorHandler);

mongoose.connect("mongodb+srv://tmbab:f2orQphSzDfhknvx@tmbab.0gyls.mongodb.net/products?authSource=admin&replicaSet=atlas-xjiqic-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", () => {
  app.listen(port, () => console.log(`Application running on port ${port}`));
});
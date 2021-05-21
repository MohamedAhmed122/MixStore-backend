import express from "express";
import dotenv from "dotenv";
import path from "path";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";


import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import userRouter from './Routes/userRouter.js'

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use('/api/users', userRouter)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`app is running in development on port ${PORT}`.blue.underline)
);

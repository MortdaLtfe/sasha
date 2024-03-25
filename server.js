import express from "express";

import globalMiddleware from "./middlewares/globalErrorMiddleware.js";
import * as authServices from "./services/authService.js";
import ApiError from "./utils/apiError.js";
import dbConnect from "./config/dbConnect.js";

import postRoutes from "./routes/postRouter.js";
import authRoutes from "./routes/authRouter.js";
import userRoutes from "./routes/userRouter.js";

import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 8000;

dbConnect();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/post", authServices.protect, postRoutes);
app.use("/api/v1/user", authServices.protect, userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("*", (res, req, next) => {
  return next(new ApiError("Cannot resolve this Page", 404));
});

app.use(globalMiddleware);
app.listen(port, () => {
  console.log(`Your Server is running on ${port}`);
});

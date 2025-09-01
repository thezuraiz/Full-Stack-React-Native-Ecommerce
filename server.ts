import { config } from "./src/config/config";
import connectDB from "./src/config/db";
import app from "./src/app";
// import express from "express";
// import userRouter from "./src/routes/authRouter";

const startServer = async () => {
  await connectDB();
  const port = config.port || 3000;

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
  console.warn(`Server is running on ${config.env} mode`);
};

startServer();

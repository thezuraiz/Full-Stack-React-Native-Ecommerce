import express from "express";
import { userRouter } from "./routes/authRouter";
import productRouter from "./routes/ProductRouter";
import cartRoute from "./routes/cartRouter";

const app = express();

// To decode and read json data
app.use(express.json({ limit: "10mb" }));

// To decode and read file
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Hello Zuraiz! App Running",
  });
});

app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRoute);

export default app;

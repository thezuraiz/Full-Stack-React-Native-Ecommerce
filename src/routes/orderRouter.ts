import express from "express";
import Order from "../controllers/orderController";
const cartRouter = express.Router();

cartRouter.get("/:id", Order.getOrder);

export default cartRouter;

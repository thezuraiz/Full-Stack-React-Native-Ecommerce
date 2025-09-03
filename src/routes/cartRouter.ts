import express from "express";
import cartController from "../controllers/cartController";

const cartRoute = express.Router();

cartRoute.get("/find/:id", cartController.getCart);
cartRoute.get("/", cartController.addToCart);
cartRoute.post("/quantity", cartController.decrementCartItem);
cartRoute.delete("/:cartItemId", cartController.deleteCartItem);

export default cartRoute;

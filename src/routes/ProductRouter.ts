import express from "express";
import {
  createProducts,
  getAllProducts,
  getProduct,
  searchProducts,
} from "../controllers/productController";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.get("/search/:key", searchProducts);
productRouter.post("/", createProducts);

export default productRouter;

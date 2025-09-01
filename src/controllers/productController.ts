import { Request, Response } from "express";
import Products from "../model/ProductsRoutes";

const createProducts = async (req: Request, res: Response) => {
  try {
    const newProduct = new Products(req.body);
    await newProduct.save();
    res.status(201).json({ product: newProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Products.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get all products" });
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Products.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get products" });
  }
};

const searchProducts = async (req: Request, res: Response) => {
  try {
    console.log("key:", req.params.key);
    const products = await Products.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: req.params.key as string,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(200).json({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Failed to search product" });
  }
};

export { createProducts, getAllProducts, getProduct, searchProducts };

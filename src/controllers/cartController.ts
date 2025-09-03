import { Request, Response } from "express";
import Cart from "../model/CartSchema";
import mongoose from "mongoose";

const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, cartItem, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (cart) {
      const existingProduct = cart.products.find((e) =>
        e.cartItem.equals(cartItem)
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({
          cartItem: new mongoose.Types.ObjectId(cartItem),
          quantity,
        });
      }

      await cart.save();

      res.status(200).json({ message: "Product added", cart });
      return;
    }

    const newCart = new Cart({
      userId,
      products: [{ cartItem: new mongoose.Types.ObjectId(cartItem), quantity }],
    });

    await newCart.save();

    res.status(200).json({ message: "Product added", cart: newCart });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
    return;
  }
};

const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const cart = await Cart.find({ userId }).populate(
      "products.cartItem",
      "_id title supplier price imageUrl"
    );
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const cartItemId = req.params.cartItemId;

    if (!cartItemId) {
      res.status(400).json({ message: "Invalid cart item ID" });
      return;
    }

    const updateCart = await Cart.findOneAndUpdate(
      {
        userId: userId,
        "products.cartItem": new mongoose.Types.ObjectId(cartItemId),
      },
      {
        $pull: {
          products: { cartItem: new mongoose.Types.ObjectId(cartItemId) },
        },
      },
      { new: true }
    );

    if (!updateCart) {
      res.status(404).json({ message: "Cart not found or item not in cart" });
      return;
    }

    res.json({ updateCart });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const decrementCartItem = async (req: Request, res: Response) => {
  try {
    const { userId, cartItemId } = req.body;
    /// First find cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.json({ message: "Cart not found" });
      return;
    }

    const existingProduct = cart.products.find((product) =>
      product.cartItem.equals(cartItemId)
    );

    console.log("existing: ", existingProduct);
    if (!existingProduct) {
      res.json({ message: "Product Not Found" });

      return;
    }

    if (existingProduct.quantity == 1) {
      cart.products.pull(existingProduct._id);
    } else {
      existingProduct.quantity--;
    }
    await cart.save();

    if (existingProduct.quantity == 0) {
      await cart.updateOne({ userId }, { pull: { products: cartItemId } });
    }
    res.json({ cart: cart });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export default { addToCart, deleteCartItem, getCart, decrementCartItem };

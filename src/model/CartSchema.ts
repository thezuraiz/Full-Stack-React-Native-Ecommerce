import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      cartItem: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },

      quantity: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.model("Cart", CartSchema);

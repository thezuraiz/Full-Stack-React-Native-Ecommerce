import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  // Todo:
  userId: { type: String, required: true },
  products: [
    {
      cartItem: { type: mongoose.Schema.Types.ObjectId, ref: "Carts" },
      quatity: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.model("Carts", CartSchema);

import { Request, Response } from "express";
import Order from "../model/OrderSchema";

const getOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const newOrder = await Order.find({ userId })
      .populate({
        path: "productId",
        select: "-description -product_location",
      })
      .exec();
    res.status(200).json({ newOrder });
  } catch (error) {
    res.status(500).json({ ...error });
  }
};

export default { getOrder };

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Users from "../model/UserSchema";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, location } = req.body;

    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
      location,
    });

    await newUser.save();

    res.status(201).json({
      message: "User successfully created",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 11000) {
      // duplicate key error (username/email)
      res.status(400).json({ message: "User already exists" });
      return;
    }
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password: pass } = req.body;

    // Check if user exists
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid email" });
      return;
    }

    // Compare password
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    // Generate JWT token
    const userToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    //  Remove sensitive data before sending
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, __v, createdAt, updatedAt, ...userData } =
      user.toObject();

    res.status(200).json({
      ...userData,
      token: userToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id as string);
    // console.log("id: ", id);
    if (!user) {
      res.json({ message: "User Not Found" });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, __v, createdAt, updatedAt, ...userData } =
      user.toObject();
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Users.findByIdAndDelete(id);
    res.status(200).json("User Deleted");
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

export { registerUser, loginUser, getUser, deleteUser };

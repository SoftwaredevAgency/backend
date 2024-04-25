import Admin from "../models/Admin";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
export const registerAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(JSON.stringify(req.body) + "data from frontend");

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const AdminExists = await Admin.findOne({ email });

    if (AdminExists !== null) {
      return res.status(409).send("That User already exists");
    }
    console.log(`the hashed password is ${hashedPassword}`);

    const user = await Admin.create({
      ...req.body,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Admin created succesfully",
      data: user,
    });
  } catch (e: any) {
    res.status(500).json({
      message: "There was an error",
      data: e,
    });
  }
};

import Admin from "../models/Admin";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const loginAdmin = async (req: Request, res: Response) => {
  console.log("hello" + process.env.ACCESS_TOKEN_SECRET);
  const { email, password } = req.body;
  console.log(JSON.stringify(req.body));

  try {
    const AdminExists = await Admin.findOne({ email });
    if (!AdminExists) {
      return res.status(404).send("Admin was not found");
    }
    console.log(AdminExists.password + "password been");
    const passwordMatch = await bcrypt.compare(password, AdminExists.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      console.log(`wrong credentials`);
      return res.status(400).send("email or password was wrong");
    }

    const accessToken = jwt.sign(
      { _id: AdminExists._id },
      process.env.ACCESS_TOKEN_SECRET as Secret,

      {
        expiresIn: "30d",
      }
    );

    const refreshToken = jwt.sign(
      { _id: AdminExists._id },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      {
        expiresIn: "365d",
      }
    );

    AdminExists["refreshToken"] = refreshToken;
    const admin = await Admin.findByIdAndUpdate(
      { _id: AdminExists._id },
      AdminExists
    );

    res.status(200).json({
      message: "Success",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (e: any) {
    console.log(JSON.stringify(e));
    res.status(500).json({
      message: "Error",
      data: e,
    });
  }
};

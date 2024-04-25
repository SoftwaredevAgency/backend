import express from "express";
import { Auth } from "firebase-admin/lib/auth/auth";
import { registerAdmin } from "../controllers/emailSignup";
import { loginAdmin } from "../controllers/emailLogin";
export const AuthRouter = express.Router();
AuthRouter.route("/signup").post(registerAdmin);
AuthRouter.route("/login").post(loginAdmin);

import express from "express";
import { makeB2cRequest, CreateToken } from "../controllers/payments"; // Assuming createToken is exported from payments controller
export const PaymentsRouter = express.Router();

PaymentsRouter.post("/send", CreateToken, makeB2cRequest);

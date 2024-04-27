import express from "express";
import { handleResults } from "../controllers/payments/urls";
import { makeB2cRequest, CreateToken } from "../controllers/payments"; // Assuming createToken is exported from payments controller
export const PaymentsRouter = express.Router();

PaymentsRouter.post("/send", CreateToken, makeB2cRequest);
PaymentsRouter.post("/results", handleResults);

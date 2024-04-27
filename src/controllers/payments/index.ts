import { NextFunction, Response } from "express";
import { AuthenticatedRequest as Request } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";
dotenv.config();
const MERCHANT_API = ` https://sandbox.safaricom.co.ke/mpesa/b2c/v3/paymentrequest`;
function createInitiatorId(): string {
  return uuidv4();
}

export const CreateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.MPESA_CONSUMER_SECRET;
  const consumerKey = process.env.MPESA_CONSUMER_KEY;

  const auth = Buffer.from(`${consumerKey}:${secret}`).toString("base64");
  console.log(auth);
  await axios
    .get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    )
    .then((data) => {
      req.token = data.data.access_token;
      next();
    })
    .catch((err) => {
      //   console.log("There was an error");
      console.log("There was an error");
    });
};
interface PaymentRequest {
  OriginatorConversationID: string;
  InitiatorName: string;
  SecurityCredential: string;
  CommandID: string;
  Amount: string;
  PartyA: string;
  PartyB: string;
  Remarks: string;
  QueueTimeOutURL: string;
  ResultURL: string;
  Occassion: string;
}
let paymentRequest: PaymentRequest = {
  OriginatorConversationID: createInitiatorId(),
  InitiatorName: "testapi",
  SecurityCredential: process.env.SECURITY_CREDENTIAL,
  CommandID: "BusinessPayment",
  Amount: "10",
  PartyA: "600998",
  PartyB: "254797168636",
  Remarks: "Thank you for working with us, you have received a payment",
  QueueTimeOutURL: "https://mydomain.com/b2c/queue",
  ResultURL: "https://mydomain.com/results",
  Occassion: "Supplier payment ",
};

export const makeB2cRequest = async (req: Request, res: Response) => {
  console.log(`The token is ${req.token}`);
  try {
    const response: AxiosResponse = await axios.post(
      MERCHANT_API,
      paymentRequest,
      {
        headers: {
          authorization: `Bearer ${req.token}`,
        },
      }
    );

    console.log("Response:", response.data);

    res
      .status(200)
      .json({ message: "Request sent for processing ", data: response.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

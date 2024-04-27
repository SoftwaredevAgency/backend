import { AuthenticatedRequest as Request } from "../../interfaces";
import { Response } from "express";
import Transaction from "../../models/Transaction";
export const handleResults = async (req: Request, res: Response) => {
  let data = {
    transactionId: req.body.Result.TransactionID,
    receiverName: req.body.Result.ResultParameters[4].Value,
    amount: req.body.Result.ResultParameters[0].Value,
    time: req.body.Result.ResultParameters[5].Value,
  };
  try {
    let transaction = await Transaction.create(data);

    //send a notification on the frontend using socket io
  } catch (error) {
    console.log(error);
  }
};

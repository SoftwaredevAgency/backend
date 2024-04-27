import mongoose from "mongoose";

export const TransactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: [true, "A transaction must have a transaction Id"],
  },
  receiverName: {
    type: String,
  },
  amount: {
    type: Number,
    required: [true, "an amount must be provided"],
  },
  time: {
    type: String,
    required: [true, "A transaction must have a timestamp"],
  },
});
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;

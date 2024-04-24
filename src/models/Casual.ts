import mongoose from "mongoose";
import { Gender, MaritalStatus } from "../global_types";
export const CasualSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A casual must have a name"],
  },
  id: {
    type: String,
    required: [true, "Acasual must have an ID number"],
    unique: true,
  },
  contact: {
    type: String,
    required: [true, "A casual must have a contact "],
  },
  mpesa: {
    type: String,
    required: [true, "A casual must have an mpesa number"],
  },
  age: {
    type: Number,
    required: [true, "A casual must provide their age"],
  },
  gender: {
    type: String,
    enum: Gender,
    required: [true, "A casual must provide their gender"],
  },
  maritalStatus: {
    type: String,
    enum: MaritalStatus,
    required: [true, "A casual must specify their marital status"],
  },
  dailyRate: {
    type: String,
  },
});
const Casual = mongoose.model("User", CasualSchema);
export default Casual;

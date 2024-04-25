import mongoose from "mongoose";
import { Gender, MaritalStatus } from "../global_types";
export const SupplierSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, "A supplier should have a business name"],
  },
  location: {
    type: String,
    required: [true, " A supplier should have a business location"],
  },
  contactPersonName: {
    type: String,
    required: [true, "A supplier should have a contact person name"],
  },
  contactPersonId: {
    type: String,
    required: [true, "An supplier should have a contact person ID"],
    unique: true,
  },
  contactPersonBankDetails: {
    type: String,
    required: [
      true,
      "A supplier should have the bank details of the contact person",
    ],
  },
  contactPersonMpesaNumber: {
    type: String,
    required: [
      true,
      "A supplier should have the mpesa number of the contact person",
    ],
  },
  harvestCapacity: {
    type: Map,
    of: Number,
  },
});
const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;

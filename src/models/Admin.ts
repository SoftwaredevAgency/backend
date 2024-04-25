import mongoose from "mongoose";
import { Gender, MaritalStatus } from "../global_types";
export const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "An admin should have an email adress"],
    unique: true,
  },
  refreshToken: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "An Admin should have a  strong password"],
  },
});
const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;

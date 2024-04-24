import mongoose from "mongoose";
import { Gender, MaritalStatus } from "../global_types";
export const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An employee must have a name"],
  },
  id: {
    type: String,
    required: [true, "An employee  must have an ID number"],
  },
  employeeNo: {
    type: String,
    required: [true, "An employee should have an employee number"],
  },
  contact: {
    type: String,
    required: [true, "An employee must have a contact "],
  },
  contactEmail: {
    type: String,
    required: [true, "An employee should have a contact email"],
  },
});
const Employee = mongoose.model("User", EmployeeSchema);
export default Employee;

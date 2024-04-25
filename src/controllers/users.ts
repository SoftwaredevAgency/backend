import { Response } from "express";
import Casual from "../models/Casual";
import Employee from "../models/Employee";
import Supplier from "../models/Supplier";
import { AuthenticatedRequest as Request } from "../interfaces";

export const registerCasual = async (req: Request, res: Response) => {
  try {
    const casual = await Casual.create(req.body);
    return res.status(200).json({
      message: `Success`,
      data: casual,
    });
  } catch (error) {
    return res.status(500).json(`The was an error ${error}`);
  }
};
export const registerEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.create(req.body);
    return res.status(200).json({
      message: `Success`,
      data: employee,
    });
  } catch (error) {
    return res.status(500).json(`The was an error ${error}`);
  }
};
export const registerSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await Supplier.create(req.body);
    return res.status(200).json({
      message: `Success`,
      data: supplier,
    });
  } catch (error) {
    return res.status(500).json(`The was an error ${error}`);
  }
};
export const fetchAllSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.find();
    return res.status(200).json({
      message: "Success",
      data: suppliers,
    });
  } catch (e) {
    return res.status(500).json({
      message: `Error`,
      data: e,
    });
  }
};
export const fetchAllCasuals = async (req: Request, res: Response) => {
  try {
    const casuals = await Casual.find();
    return res.status(200).json({
      message: "Success",
      data: casuals,
    });
  } catch (e) {
    return res.status(500).json({
      message: `Error`,
      data: e,
    });
  }
};
export const fetchAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json({
      message: "Success",
      data: employees,
    });
  } catch (e) {
    return res.status(500).json({
      message: `Error`,
      data: e,
    });
  }
};

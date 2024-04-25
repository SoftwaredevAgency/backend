import express from "express";
import {
  fetchAllCasuals,
  fetchAllEmployees,
  fetchAllSuppliers,
  registerCasual,
  registerEmployee,
  registerSupplier,
} from "../controllers/users";

export const UsersRouter = express.Router();
UsersRouter.route("/casuals/create").post(registerCasual);
UsersRouter.route("/employees/create").post(registerEmployee);
UsersRouter.route("/suppliers/create").post(registerSupplier);
UsersRouter.route("/suppliers/get").get(fetchAllSuppliers);
UsersRouter.route("/casuals/get").get(fetchAllCasuals);
UsersRouter.route("/employees/get").get(fetchAllEmployees);

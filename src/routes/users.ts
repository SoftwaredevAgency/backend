import express from "express";
import {
  registerCasual,
  registerEmployee,
  registerSupplier,
} from "../controllers/users";

export const UsersRouter = express.Router();
UsersRouter.route("/casuals/create").post(registerCasual);
UsersRouter.route("/employees/create").post(registerEmployee);
UsersRouter.route("/suppliers/create").post(registerSupplier);

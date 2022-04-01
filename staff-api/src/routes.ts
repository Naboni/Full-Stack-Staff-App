import express, { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import UserController from "./controllers/UserController";
import Middleware from "./middleware";
import UserValidator from "./validators/UserValidator";

const router = express.Router();

router.post(
  "/users",
  UserValidator.checkCreateUser(),
  Middleware.handleValidationError,
  UserController.create
);
router.get("/users", UserController.findAll);
router.get("/users/:userId", UserController.findOne);
router.put("/users/:userId", UserController.update);
router.delete("/users/:userId", UserController.delete);

export { router };

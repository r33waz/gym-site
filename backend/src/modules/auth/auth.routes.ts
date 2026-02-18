import express from "express";
import { authController } from "./auth.controller";

const route = express.Router();

// Use the instance directly
route.post("/login", authController.login);
route.post("/logout", authController.logout);

export default route;

import express from "express";
import { authController } from "./auth.controller";

const route = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: User logged in successfully
 */

// Use the instance directly
route.post("/login", authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */

route.post("/logout", authController.logout);

/**
 * @swagger
 * /auth/forget-password:
 *   post:
 *     summary: Forget password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IForgetPasswordDto'
 *     responses:
 *       200:
 *         description: User password reset email sent successfully
 */
route.post("/forget-password", authController.forgetPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IResetPasswordDto'
 *     responses:
 *       200:
 *         description: User password reset successfully
 */
route.post("/reset-password", authController.forgetPassword);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IChangePasswordDto'
 *     responses:
 *       200:
 *         description: User password changed successfully
 */
route.post("/reset-password", authController.forgetPassword);

export default route;

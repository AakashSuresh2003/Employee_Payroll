const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controller/authController");

const authMiddleware = require("../middleware/authMiddleware")

const {checkAdminAndHrRole} = require("../middleware/accessMiddleware")

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Register
 *     description: Register a new user
 * /api/v1/auth/register:
 *   post:
 *     tags: [Register]
 *     summary: Register a new user
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User data 
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "JohnDoe123" 
 *             email:
 *               type: string
 *               format: email
 *               example: "johndoe123@example.com"  
 *             password:
 *               type: string
 *               format: password
 *               example: "password123"  
 *             role:
 *               type: string
 *               enum: [admin, hr, accountant]
 *               example: "admin"  
 *           required:
 *             - name
 *             - email
 *             - password
 *             - role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "JohnDoe123"  
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe123@example.com"  
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"  
 *               role:
 *                 type: string
 *                 enum: [admin, hr, accountant]
 *                 example: "admin"  
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   enum: [admin, hr, accountant]
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/register",authMiddleware ,checkAdminAndHrRole , registerController);

/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: User login
 * /api/v1/auth/login:
 *   post:
 *     tags: [Login]
 *     summary: User login
 *     parameters:
 *       - in: body
 *         name: body
 *         description: |
 *           User data for login. Example credentials:
 *           - **HR Role**: `{"email": "Sophia21@gmail.com", "password": "Aakash"}`
 *           - **Accountant Role**: `{"email": "Liam21@gmail.com", "password": "Aakash"}`
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: "toney3000@gmail.com"
 *             password:
 *               type: string
 *               format: password
 *               example: "Aakash"
 *           required:
 *             - email
 *             - password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "toney3000@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Aakash"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   enum: [admin, hr, accountant]
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       404:
 *         description: User does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                   example: "User does not exist"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post("/login", loginController);

/**
 * @swagger
 * tags:
 *   - name: Logout
 *     description: User logout
 * /api/v1/auth/logout:
 *   get:
 *     tags: [Logout]
 *     summary: User logout
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                   example: "Logged Out"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/logout", logoutController);

module.exports = router;

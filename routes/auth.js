const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controller/authController");

const authMiddleware = require("../middleware/authMiddleware")

const {checkAdminAndHrRole} = require("../middleware/accessMiddleware")

const router = express.Router();

router.post("/register",authMiddleware ,checkAdminAndHrRole , registerController);

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

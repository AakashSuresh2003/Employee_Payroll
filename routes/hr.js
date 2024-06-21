const express = require("express");
const { createSalaryController } = require("../controller/salaryController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Net Pay
 *     description: Per Day Salary management
 * /api/v1/hr/create-salary/{id}:
 *   post:
 *     tags: [Net Pay]
 *     summary: Create a salary record for an employee
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the employee for whom to create the salary record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workingDays:
 *                 type: number
 *                 example: 20
 *                 minimum: 1
 *                 maximum: 24
 *               month:
 *                 type: string
 *                 example: "June"
 *               year:
 *                 type: number
 *                 example: 2024
 *             required:
 *               - workingDays
 *               - month
 *               - year
 *     responses:
 *       201:
 *         description: Salary created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Salary created successfully"
 *                 inHand:
 *                   type: object
 *                   properties:
 *                     employee_id:
 *                       type: string
 *                       example: "60d5e7a42a4c5f0015f43e6f"
 *                     workingDays:
 *                       type: number
 *                       example: 20
 *                     inHandSalary:
 *                       type: number
 *                       example: 60000
 *                     month:
 *                       type: string
 *                       example: "June"
 *                     year:
 *                       type: number
 *                       example: 2024
 *       400:
 *         description: Bad request (e.g., missing or invalid input)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Working days are required"
 *       403:
 *         description: Salary already exists for the specified employee and month
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Salary already exists"
 *       404:
 *         description: Employee not found or salary record not found for the employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No Employee found"
 *                   name: "February"
 *                   year: 2023
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.post("/create-salary/:id", createSalaryController);

module.exports = router;

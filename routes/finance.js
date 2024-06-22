const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getSalariesController, getSalaryByIdController, getTotalSalaryController, generatePayController } = require("../controller/financeController");
const { checkAccountantRole } = require("../middleware/accessMiddleware");
const router = express.Router();

router.use(authMiddleware);
router.use(checkAccountantRole)

/**
 * @swagger
 * tags:
 *   - name: Salary (First Create salary records for employees using Net Pay API)
 *     description: Salary management 
 * /api/v1/fa/generate-salaries:
 *   post:
 *     tags: [Salary (First Create salary records for employees using Net Pay API)]
 *     summary: Generate and save pay slips for employees based on existing salary records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully generated and saved pay slips
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Salaries calculated and saved successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post("/generate-salaries",generatePayController);


/**
 * @swagger
 * tags:
 *   - name: Salary (First Create salary records for employees using Net Pay API)
 *     description: Salary management
 * /api/v1/fa/salaries:
 *   get:
 *     tags: [Salary (First Create salary records for employees using Net Pay API)]
 *     summary: Retrieve all salary records (pay slips)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of salary records (pay slips)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d5e7a42a4c5f0015f43e6f"
 *                   employee_id:
 *                     type: string
 *                     example: "60d5e7a42a4c5f0015f43e6f"
 *                   workingDays:
 *                     type: number
 *                     example: 20
 *                   inHandSalary:
 *                     type: number
 *                     example: 60000
 *                   month:
 *                     type: string
 *                     example: "June"
 *                   year:
 *                     type: number
 *                     example: 2024
 *       404:
 *         description: No salary records found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                   example: "Salaries not found"
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


router.get("/salaries",getSalariesController);

/**
 * @swagger
 * tags:
 *   - name: Salary (First Create salary records for employees using Net Pay API)
 *     description: Salary management
 * /api/v1/fa/salaries/{id}:
 *   get:
 *     tags: [Salary (First Create salary records for employees using Net Pay API)]
 *     summary: Retrieve salary details for a specific employee by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the employee for whom to retrieve salary details
 *     responses:
 *       200:
 *         description: Salary details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d5e7a42a4c5f0015f43e6f"
 *                 employee_id:
 *                   type: string
 *                   example: "60d5e7a42a4c5f0015f43e6f"
 *                 workingDays:
 *                   type: number
 *                   example: 20
 *                 inHandSalary:
 *                   type: number
 *                   example: 60000
 *                 month:
 *                   type: string
 *                   example: "June"
 *                 year:
 *                   type: number
 *                   example: 2024
 *       400:
 *         description: Bad request (e.g., missing or invalid input)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee ID is required"
 *       404:
 *         description: Salary not found for the specified employee ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Salary not found for the given Employee ID"
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

router.get("/salaries/:id",getSalaryByIdController);

/**
 * @swagger
 * tags:
 *   - name: Salary (First Create salary records for employees using Net Pay API)
 *     description: Salary management
 * /api/v1/fa/total-salaries:
 *   get:
 *     tags: [Salary (First Create salary records for employees using Net Pay API)]
 *     summary: Get total net pay of all employees
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total net pay retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSalary:
 *                   type: number
 *                   example: 1200000
 *       404:
 *         description: No salaries found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No Salaries found"
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

router.get("/total-salaries",getTotalSalaryController);

module.exports = router;

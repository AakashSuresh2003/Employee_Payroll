const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {checkAdminRole,checkAdminAndHrRole} = require("../middleware/accessMiddleware"); 
const {
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  getAllEmployeeController,
  getEmployeeByIdController,
  createAllowencePercentage,
  updateAllowencePercentage,
  getAllowencePercentage,
  calculateSalaryController,
} = require("../controller/employeeController");

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Employee
 *     description: Employee management
 * /api/v1/employee/getall:
 *   get:
 *     tags: [Employee]
 *     summary: Get all employees
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   role:
 *                     type: string
 *                     enum: [admin, hr, accountant, employee]
 *       404:
 *         description: No Employees found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                   example: "No Employees found"
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
router.get("/getall",checkAdminAndHrRole, getAllEmployeeController);

/**
 * @swagger
 * tags:
 *   - name: Employee
 *     description: Employee management
 * /api/v1/employee/get/{id}:
 *   get:
 *     tags: [Employee]
 *     summary: Get an employee by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the employee to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee data
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
 *                   format: email
 *                 role:
 *                   type: string
 *                   enum: [admin, hr, accountant, employee]
 *       404:
 *         description: No Employee found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                   example: "No Employee found"
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

router.get("/get/:id", checkAdminAndHrRole,getEmployeeByIdController);

/**
 * @swagger
 * tags:
 *   - name: Employee
 *     description: Employee management
 * /api/v1/employee/create:
 *   post:
 *     tags: [Employee]
 *     summary: Create a new employee
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               emp_id:
 *                 type: string
 *                 example: "EMP123456"
 *               Role:
 *                 type: object
 *                 properties:
 *                   roleName:
 *                     type: string
 *                     example: "HR"
 *                   emp_grade:
 *                     type: string
 *                     example: "1"
 *               base_pay:
 *                 type: number
 *                 example: 50000
 *             required:
 *               - name
 *               - email
 *               - emp_id
 *               - Role
 *               - base_pay
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee created successfully"
 *                 employee:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     emp_id:
 *                       type: string
 *                     Role:
 *                       type: object
 *                       properties:
 *                         roleName:
 *                           type: string
 *                         emp_grade:
 *                           type: string
 *                     base_pay:
 *                       type: number
 *       403:
 *         description: Employee already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                   example: "Employee already exists"
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

router.post("/create", checkAdminRole,createEmployeeController);

/**
 * @swagger
 * tags:
 *   - name: Employee
 *     description: Employee management
 * /api/v1/employee/update/{id}:
 *   put:
 *     tags: [Employee]
 *     summary: Update an employee by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the employee to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               Role:
 *                 type: object
 *                 properties:
 *                   roleName:
 *                     type: string
 *                     example: "HR"
 *                   emp_grade:
 *                     type: string
 *                     example: "1"
 *               base_pay:
 *                 type: number
 *                 example: 50000
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                   example: "Employee updated successfully"
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                   example: "Employee not found"
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

router.put("/update/:id",checkAdminRole ,updateEmployeeController);

/**
 * @swagger
 * tags:
 *   - name: Employee
 *     description: Employee management
 * /api/v1/employee/delete/{id}:
 *   delete:
 *     tags: [Employee]
 *     summary: Delete an employee by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the employee to delete
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully Deleted Employee"
 *                 deleteEmployee:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6094b4cc1e8a253da7a440f0"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     Role:
 *                       type: object
 *                       properties:
 *                         roleName:
 *                           type: string
 *                           example: "admin"
 *                         emp_grade:
 *                           type: string
 *                           example: "A1"
 *                     base_pay:
 *                       type: number
 *                       example: 50000
 *       404:
 *         description: Employee not found or unauthorized to delete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee not found or unauthorized to delete"
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

router.delete("/delete/:id", checkAdminRole,deleteEmployeeController);

/**
 * @swagger
 * tags:
 *   - name: Allowance
 *     description: Allowance management
 * /api/v1/employee/getAllowence:
 *   get:
 *     tags: [Allowance]
 *     summary: Get allowance percentages
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of allowance percentages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6094b4cc1e8a253da7a440f0"
 *                   grade:
 *                     type: string
 *                     example: "A1"
 *                   percentage:
 *                     type: number
 *                     example: 10
 *       404:
 *         description: Allowance percentages not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Allowance percentage not found"
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
 *                 error:
 *                   type: string
 *                   example: "Error message details..."
 */

router.get("/getAllowence",checkAdminAndHrRole ,getAllowencePercentage)

/**
 * @swagger
 * tags:
 *   - name: Allowance
 *     description: Allowance management
 * /api/v1/employee/createAllowence:
 *   post:
 *     tags: [Allowance]
 *     summary: Create a new allowance percentage
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade:
 *                 type: string
 *                 example: "1"
 *               HRA:
 *                 type: number
 *                 example: 0.4
 *               DA:
 *                 type: number
 *                 example: 0.35
 *               MA:
 *                 type: number
 *                 example: 0.25
 *             required:
 *               - grade
 *               - HRA
 *               - DA
 *               - MA
 *     responses:
 *       201:
 *         description: Allowance created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Allowance created successfully"
 *                 newAllowence:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6094b4cc1e8a253da7a440f0"
 *                     grade:
 *                       type: string
 *                       example: "1"
 *                     HRA:
 *                       type: number
 *                       example: 0.4
 *                     DA:
 *                       type: number
 *                       example: 0.35
 *                     MA:
 *                       type: number
 *                       example: 0.25
 *       400:
 *         description: Allowance already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Allowance already exists"
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

router.post("/createAllowence",checkAdminRole ,createAllowencePercentage);

/**
 * @swagger
 * tags:
 *   - name: Allowance
 *     description: Allowance management
 * /api/v1/employee/updateAllowence/{id}:
 *   put:
 *     tags: [Allowance]
 *     summary: Update an allowance percentage by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the allowance to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               HRA:
 *                 type: number
 *                 example: 0.45
 *               DA:
 *                 type: number
 *                 example: 0.4
 *               MA:
 *                 type: number
 *                 example: 0.3
 *             required:
 *               - HRA
 *               - DA
 *               - MA
 *     responses:
 *       200:
 *         description: Allowance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                   example: "Allowance updated successfully"
 *       404:
 *         description: Allowance not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Allowance not found"
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

router.put("/updateAllowence/:id", checkAdminRole,updateAllowencePercentage);

/**
 * @swagger
 * tags:
 *   - name: Salary (Per Day)
 *     description: Salary calculation for per day including the hra + da + ma
 * /api/v1/employee/calculate/{id}:
 *   get:
 *     tags: [Salary (Per Day)]
 *     summary: Calculate and save salary components for an employee by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the employee to calculate salary for
 *     responses:
 *       200:
 *         description: Salary calculated and saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Salary calculated and saved successfully"
 *                 salary:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     employee_id:
 *                       type: string
 *                     HRA:
 *                       type: number
 *                     DA:
 *                       type: number
 *                     MA:
 *                       type: number
 *                     perDaySalary:
 *                       type: string
 *       400:
 *         description: Salary for this employee already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Salary for this employee already exists"
 *       404:
 *         description: Employee not found or grade not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee not found"
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

router.get("/calculate/:id", checkAdminRole,calculateSalaryController);

module.exports = router;

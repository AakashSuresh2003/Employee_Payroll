const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  getAllEmployeeController,
  getEmployeeByIdController,
  calculateSalaryController,
  createAllowencePercentage,
  updateAllowencePercentage,
  getAllowencePercentage,
} = require("../controller/employeeController");

router.use(authMiddleware);

router.get("/getall", getAllEmployeeController);

router.get("/get/:id", getEmployeeByIdController);

router.post("/create", createEmployeeController);

router.put("/update/:id", updateEmployeeController);

router.delete("/delete/:id", deleteEmployeeController);

router.get("/getAllowence",getAllowencePercentage)

router.post("/createAllowence", createAllowencePercentage);

router.put("/updateAllowence/:id", updateAllowencePercentage);

router.get("/calculate/:id", calculateSalaryController);

module.exports = router;

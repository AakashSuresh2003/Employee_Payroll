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
  calculateSalaryController,
  createAllowencePercentage,
  updateAllowencePercentage,
  getAllowencePercentage,
} = require("../controller/employeeController");

router.use(authMiddleware);

router.get("/getall",checkAdminAndHrRole, getAllEmployeeController);

router.get("/get/:id", checkAdminAndHrRole,getEmployeeByIdController);

router.post("/create", checkAdminRole,createEmployeeController);

router.put("/update/:id",checkAdminRole ,updateEmployeeController);

router.delete("/delete/:id", checkAdminRole,deleteEmployeeController);

router.get("/getAllowence",checkAdminAndHrRole ,getAllowencePercentage)

router.post("/createAllowence",checkAdminRole ,createAllowencePercentage);

router.put("/updateAllowence/:id", checkAdminRole,updateAllowencePercentage);

router.get("/calculate/:id", checkAdminRole,calculateSalaryController);

module.exports = router;

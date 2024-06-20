const express = require("express"); 
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createEmployeeController, updateEmployeeController, deleteEmployeeController, getAllEmployeeController, getEmployeeByIdController } = require("../controller/employeeController");

router.use(authMiddleware);

router.get("/getall",getAllEmployeeController);

router.get("/get/:id",getEmployeeByIdController);

router.post("/create",createEmployeeController);

router.put("/update/:id",updateEmployeeController);

router.delete("/delete/:id",deleteEmployeeController);


module.exports = router;


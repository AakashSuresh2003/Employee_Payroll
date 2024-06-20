const express = require("express"); 
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createEmployeeController, updateEmployeeController } = require("../controller/employeeController");

router.use(authMiddleware);

router.post("/create",createEmployeeController);

router.put("/update/:id",updateEmployeeController);


module.exports = router;


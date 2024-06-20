const express = require("express"); 
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createEmployeeController } = require("../controller/employeeController");

router.use(authMiddleware);

router.post("/",createEmployeeController);

module.exports = router;


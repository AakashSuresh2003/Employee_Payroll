const express = require("express"); 
const { createSalaryController } = require("../controller/salaryController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware)
router.post("/create-salary/:id",createSalaryController)

module.exports = router

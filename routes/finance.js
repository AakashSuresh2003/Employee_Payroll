const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getSalariesController, getSalaryByIdController, getTotalSalaryController, generatePayController } = require("../controller/financeController");
const router = express.Router();

router.use(authMiddleware);

router.post("/generate-salaries",generatePayController);

router.get("/salaries",getSalariesController);

router.get("/salaries/:id",getSalaryByIdController);

router.get("/total-salaries",getTotalSalaryController);

module.exports = router;

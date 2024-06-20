const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getSalariesController, getSalaryByIdController, getTotalSalaryController } = require("../controller/financeController");
const router = express.Router();

router.use(authMiddleware);

router.get("/salaries",getSalariesController);

router.get("/salaries/:id",getSalaryByIdController);

router.get("/total-salaries",getTotalSalaryController);

module.exports = router;

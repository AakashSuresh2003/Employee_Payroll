const Emp = require("../model/employeeModel");
const Salary = require("../model/salaryModel");
const InHand = require("../model/inHandModel");

const checkHrRole = (user) => {
  if (user.role !== "hr") {
    throw new Error("Unauthorized User");
  }
};

const calculateInHandSalary = (perDayPay, workingDays) => {
  return perDayPay * workingDays;
};

const createSalaryController = async (req, res) => {
  try {
    const user = req.user;
    checkHrRole(user);

    const id = req.params.id;
    if (!id) return res.status(404).json({ message: "No Employee found" });

    const employee = await Emp.findById(id);
    if (!employee)
      return res.status(404).json({ message: "No Employee found" });

    const salary = await Salary.findOne({ employee_id: id });
    if (!salary)
      return res
        .status(404)
        .json({ message: "Salary record not found for the employee" });

    const perDayPay = salary.perDaySalary;
    const { workingDays } = req.body;

    if (!workingDays)
      return res.status(400).json({ message: "Working days are required" });

    const existingEmp = await InHand.findOne({ employee_id: id });
    if (existingEmp)
      return res.status(403).json({ message: "Salary already exists" });

    const inHandSalary = calculateInHandSalary(perDayPay, workingDays);

    const inHand = new InHand({
      employee_id: id,
      workingDays,
      inHandSalary,
    });

    await inHand.save();
    res.status(201).json({ message: "Salary created successfully", inHand });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = { createSalaryController };

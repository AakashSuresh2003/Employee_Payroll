const Emp = require("../model/employeeModel");
const AllowencePercentage = require("../model/allowencePercentageModel");
const Salary = require("../model/salaryModel");

const checkAdminRole = (user) => {
  if (user.role !== "admin") {
    throw new Error("Unauthorized User");
  }
};

const getAllEmployeeController = async (req, res) => {
  try {
    const user = req.user;
    checkAdminRole(user);

    const employees = await Emp.find();
    if (!employees)
      return res.status(404).json({ Message: "No Employees found" });
    res.status(200).json(employees);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getEmployeeByIdController = async (req, res) => {
  try {
    const user = req.user;
    checkAdminRole(user);

    const id = req.params.id;
    if (!id) return res.status(404).json({ Message: "No Employee found" });
    const employee = await Emp.findById(id);
    if (!employee)
      return res.status(404).json({ Message: "No Employee found" });
    res.status(200).json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const createEmployeeController = async (req, res) => {
  try {
    const user = req.user;

    checkAdminRole(user);

    const { name, email, emp_id, Role, base_pay } = req.body;
    const { rollName, grade } = Role;

    const existingEmp = await Emp.findOne({ $or: [{ email }, { emp_id }] });
    if (existingEmp)
      return res.status(403).json({ Message: "Employee already exists" });

    const newEmployee = await Emp({ ...req.body });

    await newEmployee.save();
    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateEmployeeController = async (req, res) => {
  try {
    const user = req.user;

    checkAdminRole(user);

    const { name, email, Role } = req.body;
    const id = req.params.id;

    if (!id) return res.status(404).json("No Employee found");

    const updateDetails = await Emp.findByIdAndUpdate(id, {
      name,
      email,
      Role,
    });
    if (!updateDetails) return res.status(404).json({ Message: "Not found" });

    res.status(200).json({ Message: "Employee updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

const deleteEmployeeController = async (req, res) => {
  try {
    const user = req.user;

    checkAdminRole(user);

    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const deleteEmployee = await Emp.findByIdAndDelete(id);
    if (!deleteEmployee) {
      return res
        .status(404)
        .json({ message: "Employee not found or unauthorized to delete" });
    }

    res
      .status(200)
      .json({ message: "Successfully Deleted Employee", deleteEmployee });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createAllowencePercentage = async (req, res) => {
  const user = req.user;

  checkAdminRole(user);

  const { grade, HRA, DA, MA } = req.body;
  const allowence = await AllowencePercentage.findOne({ grade });
  if (allowence) {
    return res.status(400).json({ message: "Allowence already exists" });
  }
  const newAllowence = await AllowencePercentage({ grade, HRA, DA, MA });
  await newAllowence.save();
  res
    .status(201)
    .json({ message: "Allowence created successfully", newAllowence });
};

const updateAllowencePercentage = async (req, res) => {
  try {
    const user = req.user;

    checkAdminRole(user);

    const id = req.params.id;
    if (!id) return res.status(404).json({ message: "Allowence not found" });

    const { HRA, DA, MA } = req.body;
    const allowence = await AllowencePercentage.findByIdAndUpdate(id, {
      HRA,
      DA,
      MA,
    });
    if (!allowence)
      return res.status(404).json({ message: "Allowence not found" });
    res.status(200).json({ Message: "Allowence updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

const calculateSalaryComponents = (basePay, grade) => {
  const HRA = basePay * grade.HRA;
  const DA = basePay * grade.DA;
  const MA = basePay * grade.MA;
  const perDaySalary = (basePay + HRA + DA + MA) / 24;

  return { HRA, DA, MA, perDaySalary };
};

const calculateSalaryController = async (req, res) => {
  try {
    const user = req.user;

    checkAdminRole(user);

    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const employee = await Emp.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const grade = await AllowencePercentage.findOne({
      grade: employee.Role.grade,
    });

    if (!grade) {
      return res.status(404).json({ message: "Grade not found" });
    }

    const existingSalary = await Salary.findOne({ employee_id: employee._id });
    if (existingSalary) {
      return res
        .status(400)
        .json({ message: "Salary for this employee already exists" });
    }

    const basePay = employee.base_pay;
    const salaryComponents = calculateSalaryComponents(basePay, grade);

    const salary = new Salary({
      employee_id: employee._id,
      ...salaryComponents,
    });

    await salary.save();
    res
      .status(201)
      .json({ message: "Salary calculated and saved successfully", salary });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getAllEmployeeController,
  getEmployeeByIdController,
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  createAllowencePercentage,
  updateAllowencePercentage,
  calculateSalaryController,
};

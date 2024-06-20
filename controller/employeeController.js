const Emp = require("../model/employeeModel");
const jwt = require("jsonwebtoken");

const getAllEmployeeController = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin")
      return res.status(401).json({ Message: "UnAuthorised User" });

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
    if (user.role !== "admin")
      return res.status(401).json({ Message: "UnAuthorised User" });

    const id = req.params.id;
    if (!id) return res.status(404).json({ Message: "No Employee found" });
    const employee = await Emp.findById(id);
    if (!employee) return res.status(404).json({ Message: "No Employee found" });
    res.status(200).json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const createEmployeeController = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "admin")
      return res.status(401).json({ Message: "UnAuthorised User" });

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

    if (user.role !== "admin")
      return res.status(401).json({ Message: "UnAuthorised User" });

    const { name, email, Role } = req.body;
    const id = req.params.id;

    if (!id) return res.status(404).json("No Employee found");

    const updateDetails = await Emp.findByIdAndUpdate(id, {
      name,
      email,
      Role,
    });
    if (!updateDetails) return res.status(404).json({ Message: "Not found" });

    res.status(200).json(updateDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

const deleteEmployeeController = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized User" });
    }

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

module.exports = deleteEmployeeController;

module.exports = {
  getAllEmployeeController,
  getEmployeeByIdController,
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
};

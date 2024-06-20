const Emp = require("../model/employeeModel");
const jwt = require("jsonwebtoken");


const createEmployeeController = async(req,res) =>{
    try {
        const user = req.user;

        if(user.role !== "admin") return res.status(401).json({Message:"UnAuthorised User"});

        const {name,email,emp_id,Role} = req.body;
        const {rollName,grade} = Role;

        const existingEmp = await Emp.findOne({email});
        if(existingEmp) return res.status(403).json({Message:"Employee already exists"});

        const newEmployee = await Emp({...req.body});

        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}


module.exports = {createEmployeeController};
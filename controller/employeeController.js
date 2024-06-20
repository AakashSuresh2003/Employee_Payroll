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

const updateEmployeeController = async(req,res)=>{
    try {
        const user = req.user;

        if(user.role !== "admin") return res.status(401).json({Message:"UnAuthorised User"});

        const {name,email,Role} = req.body;
        const id = req.params.id;

        if(!id) return res.status(404).json("No Employee found");

        const updateDetails = await Emp.findByIdAndUpdate(id,{name,email,Role});
        if(!updateDetails) return res.status(404).json({Message:"Not found"});

        res.status(200).json(updateDetails);

    } catch (err) {
        console.log(err);
        res.status(500).json("Internal server error");
    }
}


module.exports = {createEmployeeController,updateEmployeeController};
const Emp = require("../model/employeeModel");
const InHand = require("../model/inHandModel");

const checkAccountantRole = (user) => {
  if (user.role !== "accountant") {
    throw new Error("Unauthorized User");
  }
};

const getSalariesController = async (req, res) => {
  try {
    const user = req.user;
    checkAccountantRole(user);

    const salaries = await InHand.find().populate({
      path: "employee_id",
      select: "name Role.roleName",
    });

    if (!salaries || salaries.length === 0) {
      return res.status(404).json("No Salaries found");
    }

    res.status(200).json(salaries);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

const getSalaryByIdController = async (req, res) => {
  try {
    const user = req.user;
    checkAccountantRole(user);

    const id = req.params.id;

    const employee = await Emp.findById(id).select("name Role.roleName");

    if (!employee) {
      return res.status(404).json("Employee not found");
    }

    const inHandSalary = await InHand.findOne({ employee_id: id }).select(
      "inHandSalary"
    );

    if (!inHandSalary) {
      return res.status(404).json("No Salary found for this employee");
    }

    const response = {
      _id: employee._id,
      name: employee.name,
      roleName: employee.Role.roleName,
      inHandSalary: inHandSalary.inHandSalary,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

const getTotalSalaryController = async(req,res)=>{
    try {
        const user =req.user;
        checkAccountantRole(user);

        const total = await InHand.aggregate([
            {
                $group:{
                    _id:null,
                    totalNetPay : {$sum:"$inHandSalary"}
                }
            }
        ]);

        if(!total) return res.status(404).json("No Salaries found");

        const totalSalary = total[0].totalNetPay;
        res.status(200).json({totalSalary})
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = { getSalariesController, getSalaryByIdController , getTotalSalaryController};

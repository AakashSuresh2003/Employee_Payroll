const Emp = require("../model/employeeModel");
const Salary = require("../model/salaryModel");
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

    const salaries = await InHand.find();

    if (!salaries) return res.status(404).json("No Salaries found");

    const salariesWithPerDay = await Promise.all(
      salaries.map(async (salary) => {
        const salaryDetails = await Salary.findOne({ employee_id: salary.employee_id._id }).select('perDaySalary');
        return {
          ...salary.toObject(),
          perDaySalary: salaryDetails ? salaryDetails.perDaySalary : null,
        };
      })
    );
    res.status(200).json(salariesWithPerDay);
  } 
  catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
}

const getSalaryByIdController = async (req, res) => {
  try {
    const user = req.user;
    checkAccountantRole(user);

    const id = req.params.id;
    if (!id) return res.status(400).json("Employee ID is required");

    const salary = await InHand.findOne({ employee_id: id });
    if (!salary) return res.status(404).json("Salary not found for the given Employee ID");

    const salaryDetails = await Salary.findOne({ employee_id: id }).select('perDaySalary');
    const result = {
      ...salary.toObject(),
      perDaySalary: salaryDetails ? salaryDetails.perDaySalary : null,
    };

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
}


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

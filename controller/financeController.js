const Salary = require("../model/salaryModel");
const InHand = require("../model/inHandModel");
const PaySlip = require("../model/paySlip");

const generatePayController = async (req, res) => {
  try {
    const salaries = await InHand.find();

    if (!salaries) return res.status(404).json("No Salaries found");

    const salariesWithPerDay = await Promise.all(
      salaries.map(async (salary) => {
        const salaryDetails = await Salary.findOne({
          employee_id: salary.employee_id._id,
        }).select("perDaySalary");
        return {
          ...salary.toObject(),
          perDaySalary: salaryDetails ? salaryDetails.perDaySalary : null,
        };
      })
    );
    console.log(salariesWithPerDay);
    const newData = salariesWithPerDay.map((data) => ({
      employee_id: data.employee_id,
      workingDays: data.workingDays,
      perDaySalary: data.perDaySalary,
      monthlySalary: data.inHandSalary,
      month: data.month,
      year: data.year,
    }));
    console.log(newData);
    await PaySlip.insertMany(newData);
    res.status(200).json("Salary calculated succesfylly");
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

const getSalariesController = async (req, res) => {
  try {
    const pay = await PaySlip.find();
    if (!pay) return res.status(404).json({ Message: "Salaries not found" });
    res.status(200).json(pay);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

const getSalaryByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json("Employee ID is required");

    const salary = await InHand.findOne({ employee_id: id });
    if (!salary)
      return res.status(404).json("Salary not found for the given Employee ID");

    const salaryDetails = await PaySlip.findOne({ employee_id: id });

    res.status(200).json(salaryDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

const getTotalSalaryController = async (req, res) => {
  try {
    const total = await PaySlip.aggregate([
      {
        $group: {
          _id: null,
          totalNetPay: { $sum: "$monthlySalary" },
        },
      },
    ]);

    if (!total) return res.status(404).json("No Salaries found");

    const totalSalary = total[0].totalNetPay;
    res.status(200).json({ totalSalary });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getSalariesController,
  getSalaryByIdController,
  getTotalSalaryController,
  generatePayController,
};

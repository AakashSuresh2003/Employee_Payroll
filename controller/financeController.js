const Salary = require("../model/salaryModel");
const InHand = require("../model/inHandModel");
const PaySlip = require("../model/paySlip");

const generatePayController = async (req, res) => {
  try {
    const salaries = await InHand.find();

    if (!salaries || salaries.length === 0) {
      return res.status(404).json("No Salaries found");
    }

    const existingPaySlips = await PaySlip.find({}, { employee_id: 1, month: 1 });
    const existingEmployeeMonths = existingPaySlips.map((paySlip) => ({
      employee_id: paySlip.employee_id.toString(),
      month: paySlip.month,
    }));

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

    const newData = salariesWithPerDay.map((data) => ({
      employee_id: data.employee_id,
      workingDays: data.workingDays,
      perDaySalary: data.perDaySalary,
      monthlySalary: data.inHandSalary,
      month: data.month,
      year: data.year,
    }));

    const newDataFiltered = newData.filter((data) => {
      const exists = existingEmployeeMonths.some(
        (existing) =>
          existing.employee_id === data.employee_id.toString() && existing.month === data.month
      );
      return !exists;
    });

    if (newDataFiltered.length > 0) {
      await PaySlip.insertMany(newDataFiltered);
      return res.status(200).json("Salaries calculated and saved successfully");
    } else {
      return res.status(200).json("No new salaries to calculate or save");
    }
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

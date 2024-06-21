const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
    },
    emp_id: {
      type: String,
      required: true,
      unique: [true, "Employee Id should be unique"],
    },
    Role: {
      roleName: {
        type: String,
        required: true,
      },
      emp_grade: {
        type: String,
        required: true,
      },
    },
    base_pay: {
      type: Number,
      required: true,
    },
  },
  {
    timestramps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);

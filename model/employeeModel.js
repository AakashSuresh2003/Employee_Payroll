const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  emp_id: {
    type: String,
    required: true,
    unique: [true, "Employee Id should be unique"],
  },
  Role: {
    type: {
      rollName: {
        type: String,
        required: true,
      },
      grade: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);

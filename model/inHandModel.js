const mongoose = require("mongoose");

const inHandSchema = mongoose.Schema(
    {
        employee_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        workingDays: {
            type: Number,
            required: true,
        },
        inHandSalary: {
            type: Number,
            required: true,
        },
    }
)

module.exports = mongoose.model("InHand", inHandSchema);
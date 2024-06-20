const dotenv = require('dotenv').config();
const express = require('express');
const ConnectDB = require('./db/database');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/auth");
const employeeRouter = require("./routes/employee");
const hrRouter = require("./routes/hr");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/employee",employeeRouter);
app.use("/api/v1/hr",hrRouter);

ConnectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})
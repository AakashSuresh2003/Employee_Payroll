const dotenv = require("dotenv").config();
const express = require("express");
const ConnectDB = require("./db/database");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const employeeRouter = require("./routes/employee");
const hrRouter = require("./routes/hr");
const faRouter = require("./routes/finance");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

app.use(express.static("public"));

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your React app's domain
  credentials: true, // Allow cookies to be sent
};


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Payroll API",
      description: "API endpoints for payroll services documented on Swagger",
      contact: {
        name: "Aakash S",
        email: "aakashsuresh455@gmail.com",
        url: "https://github.com/aakashsuresh2003/Employee_Payroll",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://employee-payroll-jet.vercel.app",
        description: "Deployed server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.status(200).json("Welcome to Employee Payroll API");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/hr", hrRouter);
app.use("/api/v1/fa", faRouter);

ConnectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

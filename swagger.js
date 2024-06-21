const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
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
        url: "http://localhost:3000/",
        description: "Local server",
      },
      {
        url: "https://employee-payroll-black.vercel.app",
        description: "Vercel server",
      }
    ],
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;
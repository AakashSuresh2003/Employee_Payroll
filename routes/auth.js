const express = require("express"); 
const { registerController } = require("../controller/authController");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from router");
});

router.post("/register",registerController);

module.exports = router
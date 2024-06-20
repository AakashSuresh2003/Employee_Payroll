const express = require("express"); 
const { registerController, loginController } = require("../controller/authController");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from router");
});

router.post("/register",registerController);

router.post("/login",loginController);

module.exports = router
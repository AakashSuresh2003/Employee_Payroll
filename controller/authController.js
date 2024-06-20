const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("This e-mail is already registered");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = await User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("The user Not found");
    const matchedData = await bcrypt.compareSync(password, user.password);
    const { password: _, ...data } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    res.cookie("token", token).status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const logoutController = async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: true, secure: true })
      .status(200)
      .json({ Message: "Logged Out" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { registerController, loginController, logoutController };

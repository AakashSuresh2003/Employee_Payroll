const dotenv = require('dotenv').config();
const express = require('express');
const ConnectDB = require('./db/database');
const app = express();
const cors = require('cors');
const authRouter = require("./routes/auth");

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth",authRouter);

ConnectDB();

app.get('/', (req, res) => {
    res.send('Hello World');
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})
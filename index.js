const dotenv = require('dotenv').config();
const express = require('express');
const ConnectDB = require('./db/database');
const app = express();
const cors = require('cors');

app.use(cors());

ConnectDB();

app.get('/', (req, res) => {
    res.send('Hello World');
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})
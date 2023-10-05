const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
//database connnection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to DB"))
.catch((err) => console.log("Not Connected to DB", err))
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use('/', require('./routes/authRoutes'));
app.use("/api", require("./routes/contactRoutes"));
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
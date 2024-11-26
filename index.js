const express = require('express');

const userRouter = require('./routes/user.routes');
const indexRouter = require("./routes/index.routes");
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

connectDB();

app.get("/", (req, res) => {
    res.render("index");
});

app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log("server running on port 3000"); 
});
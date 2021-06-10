const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors =require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:["http://localhost:3000"],
  credentials:true
}));

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true ,useUnifiedTopology: true}).
  catch(error => handleError(error));

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
  
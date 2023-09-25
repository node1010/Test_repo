const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("./config/dbConnect");
const morgan = require("morgan");
const createError = require("http-errors");
const multer = require("multer");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3005;
const upload = multer({ dest: 'uploads/' })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB();
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", require("./router/userRoute"))
app.use("/api", require("./router/productRoute"))
app.use("/api", require("./router/orderRoute"))

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

// const currentDate = new Date();
// const year = currentDate.getFullYear();
// const month = String(currentDate.getMonth() + 1);
// const day = String(currentDate.getDate());
// const formattedDate = `${year}-${month}-${day}`;

// console.log(formattedDate);

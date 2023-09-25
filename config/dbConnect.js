const mongoose = require("mongoose");

const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected");
  } catch (error) {
    console.log("Not Connected");
  }
};

module.exports = connect;

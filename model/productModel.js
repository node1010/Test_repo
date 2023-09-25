const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inventory: {
    type: Number,
  }
});

//Export the model
module.exports = mongoose.model("product", productSchema);

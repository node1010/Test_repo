const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user",
//     required: true,
//   },
//   products: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "product",
//       required: true,
//     },
//   ],
//   orderDate: {
//     type: Date,
//     default: Date.now,
//     required: true,
//   },
// });

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);

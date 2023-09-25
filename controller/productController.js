const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");

exports.createProduct = asyncHandler(async (req, res, next) => {
    try {
      const { name, price, inventory } = req.body;
      if (!name || !price)
        return next(new Error("Fill require fields"));
  
      const findProduct = await Product.findOne({ name });
      if (findProduct) return next(new Error("Product name exist"));
  
      const createProduct = await Product.create({ name, price, inventory });

      return res.json({
        status: true,
        message: "Product added Successfully",
        createProduct,
      });

    } catch (error) {
      throw new Error(error.message);
    }
  });
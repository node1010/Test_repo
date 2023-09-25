const { createProduct } = require('../controller/productController.js');

const router = require('express').Router();

router.post("/createProduct", createProduct)

module.exports = router
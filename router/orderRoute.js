const { createOrder, billing } = require('../controller/orderController');
const { isAuthentication } = require('../middleWare/auth');

const router = require('express').Router();

router.post("/createOrder", createOrder)
router.get("/billing",isAuthentication, billing)

module.exports = router
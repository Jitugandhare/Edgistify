const express = require("express");
const authMiddleware = require("../middleware/auth.middleware.js");
const {getCartItems,addToCart}=require("../controller/cart.controller.js")
const router = express.Router();



router.get("/", authMiddleware,getCartItems);
router.post("/add", authMiddleware,addToCart);

module.exports = router;

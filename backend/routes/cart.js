const express = require("express");
const Cart = require("../models/cart.model.js");
const Product = require("../models/product.model.js");
const authMiddleware = require("../middleware/auth.middleware.js");

const router = express.Router();



router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId }).populate("products.productId");
 
  if (!cart) {
    return res.status(404).json({ msg: "Cart not found" });
  }

  res.json(cart);
});



router.post("/add", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  if (!productId || !quantity) {
    return res.status(400).json({ msg: "Product ID and quantity are required" });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }

  if (product.stock < quantity) {
    return res.status(400).json({ msg: "Not enough stock" });
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, products: [{ productId, quantity }] });
    await cart.save();
  } else {
    const existingProduct = cart.products.find(p => p.productId.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
    await cart.save();
  }

  res.json({ msg: "Product added to cart", cart });
});

module.exports = router;

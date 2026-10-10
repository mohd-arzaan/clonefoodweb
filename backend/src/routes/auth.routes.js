const express = require('express');
const authController = require("../controller/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router();

// ---------- USER AUTH ----------
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)

// User check (navbar ke liye)
router.get('/me', authMiddleware.authUserMiddleware, (req, res) => {
  res.status(200).json({ user: req.user })
})

// ---------- FOOD PARTNER AUTH ----------
router.post('/food-partner/register', authController.registerFoodPartner)
router.post('/food-partner/login', authController.loginFoodPartner)
router.get('/food-partner/logout', authController.logoutFoodPartner)

// Partner check (navbar ke liye)
router.get('/partner/me', authMiddleware.authFoodPartnerMiddleware, (req, res) => {
  res.status(200).json({ partner: req.foodPartner })
})

module.exports = router;
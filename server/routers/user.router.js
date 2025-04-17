const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  checkAuth,
} = require("../controllers/user.controller.js");

const { protectedRoute } = require("../middleware/auth.middleware.js");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/logout", logoutUser);
router.get("/check", protectedRoute, checkAuth);

export default router;

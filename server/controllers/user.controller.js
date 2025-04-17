
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.js");

export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // 1. ตรวจสอบว่ามี user ซ้ำหรือไม่
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2. แฮชรหัสผ่าน
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. สร้าง user ใหม่
    const newUser = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      profilePic: "", // default or blank
      friends: [],
      friendRequests: [],
    });

    // 4. สร้าง token และเก็บไว้ใน cookie
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // 5. ส่งข้อมูลกลับไป frontend (ไม่รวม password)
    const { password: pass, ...userData } = newUser._doc;
    res.status(201).json(userData);
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Something went wrong during signup" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 86400000,
      })
      .json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

export const checkAuth = async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  res.status(200).json(user);
};
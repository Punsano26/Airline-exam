const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//UserSchema เป็นชื่อคลาส
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const UserModel = model("User", UserSchema);
module.exports = UserModel;

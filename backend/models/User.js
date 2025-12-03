const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  password: String,
  role: { type: String, default: "candidate" }, // or "client" or "admin"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);

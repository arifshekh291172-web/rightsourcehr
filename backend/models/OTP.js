const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
    phone: String,
    email: String,
    otp: String,
    expiry: Number
}, { collection: "otps" });

module.exports = mongoose.model("Otp", OtpSchema);

const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email: String,
    password: String
}, { collection: "admins" });   // IMPORTANT

module.exports = mongoose.model("Admin", AdminSchema);

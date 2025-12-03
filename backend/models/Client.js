const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    company: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: "clients" });

module.exports = mongoose.model("Client", ClientSchema);

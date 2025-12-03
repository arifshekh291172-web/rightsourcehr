const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    jobId: String,
    name: String,
    email: String,
    phone: String,
    resume: String,
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { collection: "applications" });

module.exports = mongoose.model("Application", ApplicationSchema);

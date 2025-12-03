const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    salary: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: "jobs" });

module.exports = mongoose.models.Job || mongoose.model("Job", JobSchema);

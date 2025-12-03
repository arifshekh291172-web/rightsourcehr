const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    resume: String,
    appliedFor: String,
    registeredAt: {
        type: Date,
        default: Date.now
    }
}, { collection: "candidates" });

module.exports = mongoose.model("Candidate", CandidateSchema);

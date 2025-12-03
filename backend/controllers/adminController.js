const Job = require("../models/Job");
const Application = require("../models/Application");
const Candidate = require("../models/Candidate");

exports.getStats = async (req, res) => {
    try {
        const jobs = await Job.countDocuments();
        const applications = await Application.countDocuments();
        const candidates = await Candidate.countDocuments();

        res.json({
            success: true,
            jobs,
            applications,
            candidates
        });

    } catch (err) {
        res.json({ success: false, message: "Error fetching stats" });
    }
};

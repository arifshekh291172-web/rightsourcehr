// =====================================================
// FILE: backend/routes/adminRoutes.js
// ADMIN PANEL ROUTES (STATS + CLIENT REQUEST MANAGEMENT)
// =====================================================

const express = require("express");
const router = express.Router();

const Job = require("../models/Job");
const Candidate = require("../models/Candidate");
const Application = require("../models/Application");
const Client = require("../models/Client");


// =====================================================
// ADMIN DASHBOARD STATS
// =====================================================
router.get("/stats", async (req, res) => {
    try {
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();
        const totalCandidates = await Candidate.countDocuments();

        return res.json({
            success: true,
            totalJobs,
            totalApplications,
            totalCandidates
        });

    } catch (err) {
        console.log("STATS ERROR:", err);
        return res.json({ success: false });
    }
});


// =====================================================
// GET ALL CLIENT JOB REQUESTS (For Admin Panel)
// =====================================================
router.get("/client-requests", async (req, res) => {
    try {
        const requests = await Job.find().sort({ createdAt: -1 });

        return res.json({
            success: true,
            requests
        });

    } catch (err) {
        console.log("REQUEST LIST ERROR:", err);
        return res.json({ success: false });
    }
});


// =====================================================
// UPDATE CLIENT REQUEST STATUS + REMARK
// =====================================================
router.put("/request-status", async (req, res) => {
    try {
        const { id, status, remark } = req.body;

        if (!id || !status) {
            return res.json({
                success: false,
                message: "Missing id or status"
            });
        }

        await Job.findByIdAndUpdate(
            id,
            { status, remark: remark || "" },
            { new: true }
        );

        return res.json({
            success: true,
            message: "Status updated successfully"
        });

    } catch (err) {
        console.log("STATUS UPDATE ERROR:", err);
        return res.json({ success: false });
    }
});


// =====================================================
module.exports = router;

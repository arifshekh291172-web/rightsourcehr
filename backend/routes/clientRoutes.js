// ===============================================================
// FILE: backend/routes/clientRoutes.js
// CLIENT DASHBOARD APIs (Submit Request + My Requests)
// ===============================================================

const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// ===============================================================
// 1) SUBMIT JOB REQUEST  (CLIENT → ADMIN)
// ===============================================================
router.post("/submit-request", async (req, res) => {
    try {
        const {
            email,
            company,
            title,
            description,
            location,
            salary,
            skills,
            role
        } = req.body;

        if (!email) {
            return res.json({
                success: false,
                message: "Client email missing"
            });
        }

        await Job.create({
            email,
            company,
            title,
            description,
            location,
            salary,
            skills,
            role,
            status: "pending",  // default
            remark: ""          // admin remark
        });

        return res.json({
            success: true,
            message: "Request submitted successfully!"
        });

    } catch (error) {
        console.log("SUBMIT REQUEST ERROR:", error);
        res.json({
            success: false,
            message: "Server Error"
        });
    }
});


// ===============================================================
// 2) GET CLIENT'S OWN JOB REQUESTS
// ===============================================================
router.get("/my-requests", async (req, res) => {
    try {
        const email = req.query.email;

        if (!email) {
            return res.json({
                success: false,
                message: "Email missing"
            });
        }

        const requests = await Job.find({ email }).sort({ createdAt: -1 });

        return res.json({
            success: true,
            requests
        });

    } catch (error) {
        console.log("GET MY REQUEST ERROR:", error);
        res.json({
            success: false,
            message: "Server Error"
        });
    }
});

module.exports = router;

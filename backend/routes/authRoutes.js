// ===============================================================
// FILE: backend/routes/authRoutes.js
// COMPLETE AUTH SYSTEM (ADMIN + CLIENT + RESET PASSWORD)
// ===============================================================

const express = require("express");
const router = express.Router();

const { adminLogin } = require("../controllers/authController");
const Client = require("../models/Client");
const OTP = require("../models/OTP");
const Job = require("../models/Job");       // <-- ADDED
const sendEmail = require("../utils/sendEmail");


// ===============================================================
// ADMIN LOGIN
// ===============================================================
router.post("/admin/login", async (req, res) => {
    try {
        await adminLogin(req, res);
    } catch (error) {
        console.log("AUTH ROUTE ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Auth Route Failed"
        });
    }
});



// ===============================================================
// CLIENT REGISTER
// ===============================================================
router.post("/client-register", async (req, res) => {
    try {
        const { name, email, company, password } = req.body;

        const exists = await Client.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "Email already registered!"
            });
        }

        await Client.create({
            name,
            email,
            company,
            password
        });

        res.json({
            success: true,
            message: "Client Registered Successfully!"
        });

    } catch (error) {
        console.log("CLIENT REGISTER ERROR:", error);
        res.json({
            success: false,
            message: "Server Error"
        });
    }
});



// ===============================================================
// CLIENT LOGIN
// ===============================================================
router.post("/client-login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const client = await Client.findOne({ email });

        if (!client) {
            return res.json({
                success: false,
                message: "Client not found"
            });
        }

        if (client.password !== password) {
            return res.json({
                success: false,
                message: "Wrong password"
            });
        }

        res.json({
            success: true,
            message: "Login Success",
            client: {
                id: client._id,
                name: client.name,
                email: client.email
            }
        });

    } catch (error) {
        console.log("CLIENT LOGIN ERROR:", error);
        res.json({
            success: false,
            message: "Server Error"
        });
    }
});



// ===============================================================
// SEND RESET PASSWORD OTP
// ===============================================================
router.post("/reset/send-otp", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await Client.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "Email not registered!"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        await OTP.deleteMany({ email });

        await OTP.create({
            email,
            otp,
            expiry: Date.now() + 5 * 60 * 1000
        });

        await sendEmail(
            email,
            "Right Source HR - Password Reset OTP",
            `<h2>Your OTP:</h2>
             <h1>${otp}</h1>
             <p>This OTP expires in 5 minutes.</p>`
        );

        res.json({
            success: true,
            message: "OTP Sent to Email!"
        });

    } catch (error) {
        console.log("SEND OTP ERROR:", error);
        res.json({
            success: false,
            message: "Server Error"
        });
    }
});



// ===============================================================
// VERIFY RESET PASSWORD OTP
// ===============================================================
router.post("/reset/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        const record = await OTP.findOne({ email });

        if (!record)
            return res.json({ success: false, message: "OTP not found!" });

        if (record.expiry < Date.now())
            return res.json({ success: false, message: "OTP expired!" });

        if (record.otp !== otp)
            return res.json({ success: false, message: "Incorrect OTP!" });

        res.json({
            success: true,
            message: "OTP Verified!"
        });

    } catch (error) {
        console.log("VERIFY OTP ERROR:", error);
        res.json({
            success: false,
            message: "Server Error"
        });
    }
});



// ===============================================================
// CHANGE PASSWORD
// ===============================================================
router.post("/reset/change-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = await Client.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found!"
            });
        }

        user.password = newPassword;
        await user.save();

        await OTP.deleteMany({ email });

        res.json({
            success: true,
            message: "Password updated successfully!"
        });

    } catch (error) {
        console.log("RESET PASSWORD ERROR:", error);
        res.json({
            success: false,
            message: "Server Error"
        });
    }
});



// ===============================================================
// ⭐ CLIENT DASHBOARD — GET ALL JOB REQUESTS + STATUS + REMARK
// ===============================================================
router.get("/client/requests/:email", async (req, res) => {
    try {
        const { email } = req.params;

        const requests = await Job.find({ email }).sort({ createdAt: -1 });

        res.json({
            success: true,
            requests
        });

    } catch (error) {
        console.log("CLIENT REQUESTS ERROR:", error);
        res.json({
            success: false,
            message: "Server Error"
        });
    }
});



// ===============================================================
// EXPORT ROUTER
// ===============================================================
module.exports = router;

const express = require("express");
const router = express.Router();
const Otp = require("../models/OTP");
const sendEmail = require("../utils/sendEmail");

/* -------------------------------------------
   SEND OTP (Signup / Email Verification)
------------------------------------------- */
router.post("/send", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.json({ success: false, message: "Email is required!" });
        }

        // Generate 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000);

        // Delete old OTP if exists
        await Otp.deleteMany({ email });

        // Save new OTP
        await Otp.create({
            email,
            otp: otpCode,
            expiry: Date.now() + 5 * 60 * 1000
        });

        // Send OTP through email
        const mailHtml = `
            <h2>Right surce HR Email Verification OTP</h2>
            <h6>Don't Share Anyone</h6>
            <p>Your OTP Right Source HR Verification is:</p>
            <h1>${otpCode}</h1>
            <p>This OTP is valid for 5 minutes.Don't Share Anyone
             ~Right source HR team
            </p>
        `;

        await sendEmail(email, "Right Source HR - OTP Verification", mailHtml);

        res.json({ success: true, message: "OTP sent to email!" });

    } catch (error) {
        console.log("OTP SEND ERROR:", error);
        res.json({ success: false, message: "Failed to send OTP" });
    }
});

/* -------------------------------------------
   VERIFY OTP
------------------------------------------- */
router.post("/verify", async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.json({ success: false, message: "Email and OTP required!" });
        }

        const record = await Otp.findOne({ email });

        if (!record)
            return res.json({ success: false, message: "OTP not found!" });

        if (record.expiry < Date.now())
            return res.json({ success: false, message: "OTP expired!" });

        if (record.otp != otp)
            return res.json({ success: false, message: "Wrong OTP!" });

        // OTP correct → remove it
        await Otp.deleteMany({ email });

        return res.json({ success: true, message: "OTP Verified!" });

    } catch (error) {
        console.log("OTP VERIFY ERROR:", error);
        res.json({ success: false, message: "Server error" });
    }
});

module.exports = router;

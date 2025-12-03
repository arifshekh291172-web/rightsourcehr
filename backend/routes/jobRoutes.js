const express = require("express");
const router = express.Router();
const Otp = require("../models/OTP");
const sendEmail = require("../utils/sendEmail");

/* SEND OTP */
router.post("/send", async (req, res) => {
    try {
        const { email } = req.body;

        const otp = Math.floor(100000 + Math.random() * 900000);

        await Otp.deleteMany({ email });

        await Otp.create({
            email,
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        });

        const html = `<h1>Your OTP is: ${otp}</h1>`;
        await sendEmail(email, "Right Source HR OTP", html);

        res.json({ success: true });

    } catch (err) {
        res.json({ success: false });
    }
});

/* VERIFY OTP */
router.post("/verify", async (req, res) => {
    try {
        const { email, otp } = req.body;

        const record = await Otp.findOne({ email });

        if (!record) return res.json({ success: false });

        if (record.expiresAt < Date.now())
            return res.json({ success: false });

        if (record.otp !== otp)
            return res.json({ success: false });

        res.json({ success: true });

    } catch (err) {
        res.json({ success: false });
    }
});

module.exports = router;

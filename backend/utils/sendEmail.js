const nodemailer = require("nodemailer");

module.exports = async function sendEmail(to, subject, html) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: to,
            subject: subject,
            html: html
        };

        await transporter.sendMail(mailOptions);
        console.log("EMAIL SENT TO:", to);

    } catch (error) {
        console.log("SEND EMAIL ERROR:", error);
    }
};

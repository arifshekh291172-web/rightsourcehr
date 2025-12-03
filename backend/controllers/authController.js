const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("LOGIN REQUEST:", email, password);

        // Find admin from Atlas (admins collection)
        const admin = await Admin.findOne({ email });

        console.log("FOUND ADMIN:", admin);

        // If no admin or wrong password
        if (!admin || admin.password !== password) {
            return res.json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { adminId: admin._id },
            "MYSECRETKEY",
            { expiresIn: "1d" }
        );

        return res.json({
            success: true,
            token
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "SERVER ERROR"
        });
    }
};

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

app.get("/", (req, res) => {
  res.send("RSH Backend Running (Atlas Connected)");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/otp", require("./routes/otpRoutes"));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server Running on ${process.env.PORT || 5000}`)
);

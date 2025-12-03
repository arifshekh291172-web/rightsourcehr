// backend/utils/sendSMS.js
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function sendSMS(phone, otp) {
  try {
    // TEXT-ONLY OTP (NO CALL)
    const url = `https://2factor.in/API/V1/${process.env.TWO_FACTOR_API_KEY}/SMS/${phone}/${otp}/AUTOGEN2`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.Status === "Success") {
      console.log("📩 TEXT OTP sent to:", phone);
      return { success: true };
    } else {
      console.log("❌ OTP Failed:", data);
      return { success: false, error: data };
    }

  } catch (err) {
    console.log("❌ SMS ERROR:", err);
    return { success: false, error: err };
  }
}

module.exports = sendSMS;

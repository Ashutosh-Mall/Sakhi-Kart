export const generateOtpEmail = (otp, username) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
    <div style="max-width:500px; margin:auto; background:white; padding:20px; border-radius:10px; text-align:center;">
      
      <h2 style="color:#16a34a;">🌱 Kishan Connect</h2>
      
      <p style="font-size:16px;">Hi ${username || "User"},</p>
      
      <p style="font-size:15px;">
        Your OTP for verifying your account is:
      </p>
      
      <h1 style="letter-spacing:5px; color:#16a34a;">${otp}</h1>
      
      <p style="font-size:14px; color:gray;">
        This OTP is valid for <b>5 minutes</b>.
      </p>

      <hr style="margin:20px 0;" />

      <p style="font-size:12px; color:gray;">
        If you did not request this, please ignore this email.
      </p>

    </div>
  </div>
  `;
};
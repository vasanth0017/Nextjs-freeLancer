import db from "@/prisma/db";
import { randomBytes } from "crypto";
import { addHours } from "date-fns";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD  
  },
  tls: {
    rejectUnauthorized: false
  }
});

const handler = async (req: any, res: any) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    // Verify email configuration first
    await transporter.verify();
    
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const resetToken = randomBytes(32).toString("hex");
    const resetTokenExpiry = addHours(new Date(), 1);

    await db.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"Free Launce Market" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    // Add error handling for the email sending
    const info = await transporter.sendMail(mailOptions);

    res.json({ message: "Reset link sent to email" });
  } catch (error:any) {
    console.error('Detailed error:', error);
    res.status(500).json({ 
      error: "Failed to send reset email",
      details: error.message 
    });
  }
};

export default handler;
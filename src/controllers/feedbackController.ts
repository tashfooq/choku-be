import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const sendFeedbackHandler = async (req: Request, res: Response) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "bot@choku.app",
      pass: "Bot123Man321!",
    },
  });

  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await transporter.sendMail({
      from: "bot@choku.app",
      to: "matt@choku.app",
      subject: "Feedback from Choku",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${feedback}`,
    });
    return res.status(200).json({ message: "Feedback sent successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

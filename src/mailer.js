
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,      
    pass: process.env.GMAIL_APP_PASS   
  }
});

/**
 
 * @param {Object} param0
 * @param {string} param0.para 
 * @param {string} param0.asunto 
 * @param {string} param0.html 
 */
export async function enviarMail({ para, asunto, html }) {
  try {
    await transporter.sendMail({
      from: `"Vaquilier" <${process.env.GMAIL_USER}>`,
      to: para,
      subject: asunto,
      html
    });
  } catch (err) {
    console.error("Error enviando mail:", err);
    throw err;
  }
}

export default transporter;


import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Crear transporte de Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,      // tu email
    pass: process.env.GMAIL_APP_PASS   // tu App Password de Gmail
  }
});

/**
 * Función para enviar un mail.
 * @param {Object} param0
 * @param {string} param0.para - email del destinatario
 * @param {string} param0.asunto - asunto del correo
 * @param {string} param0.html - contenido HTML del correo
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

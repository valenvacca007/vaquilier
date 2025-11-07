import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const enviarPedidoEmail = async (req, res) => {
  try {
    const { nombre, email, items, total } = req.body;

    const detalle = items
      .map(p => `${p.nombre} x${p.cantidad} — $${p.precio * p.cantidad}`)
      .join("\n");

    const mensaje = `
Hola ${nombre}! 💫

Gracias por tu compra en Valkiria 🌙

Tu pedido incluye:
---------------------------------
${detalle}
---------------------------------
TOTAL: $${total}

Nos estaremos comunicando para coordinar entrega o envío 🚚✨
`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,   // tu email Gmail
        pass: process.env.EMAIL_PASS    // clave de aplicación
      }
    });

    await transporter.sendMail({
      from: `"Valkiria" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmación de tu compra ✨",
      text: mensaje
    });

    return res.status(200).json({ ok: true, message: "Correo enviado" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: "Error al enviar correo" });
  }
};

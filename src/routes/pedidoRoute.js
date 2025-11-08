
import express from "express";
import { enviarMail } from "../mailer.js"; // apunta al backend

const router = express.Router();

// POST /api/pedidos
router.post("/", async (req, res) => {
  const { nombre, email, carrito } = req.body;

  if (!nombre || !email || !carrito || carrito.length === 0) {
    return res.status(400).json({ ok: false, msg: "Faltan datos del pedido" });
  }

  // Calcular total
  const total = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  // Crear HTML del correo
  const htmlPedido = `
    <h1>Gracias por tu compra, ${nombre}!</h1>
    <p>Detalles del pedido:</p>
    <ul>
      ${carrito.map(i => `<li>${i.nombre} x${i.cantidad} - $${i.precio * i.cantidad}</li>`).join("")}
    </ul>
    <p>Total: $${total}</p>
  `;

  try {
    // Enviar correo al cliente
    await enviarMail({
      para: email,
      asunto: "Confirmación de tu compra 💌",
      html: htmlPedido
    });

    // Enviar correo a administración
    await enviarMail({
      para: process.env.GMAIL_USER,
      asunto: `Nuevo pedido de ${nombre}`,
      html: htmlPedido
    });

    res.json({ ok: true, msg: "Correos enviados correctamente" });
  } catch (error) {
    console.error("Error al enviar mail:", error);
    res.status(500).json({ ok: false, msg: "No se pudo enviar el correo" });
  }
});

export default router;

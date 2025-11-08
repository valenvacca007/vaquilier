import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";


import productRoutes from "./routes/productRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import pedidoRoutes from "./routes/pedidoRoute.js";

dotenv.config();

// Resolver __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public/html")));
// Servir la página de detalle de producto
app.get("/producto.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/producto.html"));
});

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/index.html"));
});

// Rutas API
app.use("/api/productos", productRoutes);
app.use("/api/categorias", categoryRoutes);
app.use("/api/pedidos", pedidoRoutes);

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS // Contraseña de aplicación
  }
});

// Ruta para enviar mail de pedido
app.post("/api/pedidos/email", async (req, res) => {
  const { nombre, email, items, total } = req.body;

  if (!nombre || !email || !items || items.length === 0) {
    return res.status(400).json({ message: "Datos incompletos del pedido" });
  }

  // Email para el cliente
  const htmlCliente = `
  <div style="font-family: 'Poppins', sans-serif; max-width:600px; margin:auto; background:#fff8f9; border-radius:16px; padding:30px;">
    <h1 style="text-align:center; color:#E91E63;">¡Gracias por tu compra, ${nombre}!</h1>
    <ul>
      ${items.map(i => `<li>${i.nombre} x${i.cantidad} - $${i.precio*i.cantidad}</li>`).join("")}
    </ul>
    <p>Total: $${total}</p>
  </div>
  `;

  // Email para el admin
  const htmlAdmin = `
  <div style="font-family: 'Poppins', sans-serif; max-width:600px; margin:auto; background:#fefefe; border-radius:16px; padding:30px;">
    <h2>Nuevo pedido recibido</h2>
    <p><strong>Cliente:</strong> ${nombre}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Total:</strong> $${total}</p>
    <ul>
      ${items.map(i => `<li>${i.nombre} x${i.cantidad} - $${i.precio*i.cantidad}</li>`).join("")}
    </ul>
  </div>
  `;

  try {
    // Enviar al cliente
    await transporter.sendMail({
      from: `"Vaquilier" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Confirmación de tu compra 💌",
      html: htmlCliente
    });

    // Enviar al admin
    await transporter.sendMail({
      from: `"Vaquilier" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Nuevo pedido de ${nombre} ✨`,
      html: htmlAdmin
    });

    res.status(200).json({ message: "Correos enviados correctamente" });
  } catch (err) {
    console.error("Error al enviar emails:", err);
    res.status(500).json({ message: "No se pudieron enviar los correos" });
  }
});

// Puerto y conexión a MongoDB
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};
// Detalle dinámico de producto
app.get("/producto/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar producto en MongoDB
    const Producto = mongoose.model("Producto"); // o importalo de tu modelo si lo tenés separado
    const producto = await Producto.findById(id);

    if (!producto) return res.status(404).send("Producto no encontrado");

    // HTML dinámico del producto
    const html = `
      <html>
        <head>
          <title>${producto.nombre}</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div class="detalle-producto">
            <h1>${producto.nombre}</h1>
            <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width:400px;">
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito('${producto._id}', '${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
            <a href="/">Volver</a>
          </div>
        </body>
      </html>
    `;
    res.send(html);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar el producto");
  }
});


startServer();

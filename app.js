import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./src/config/db.js";
import productRoutes from "./src/routes/productRoute.js";
import categoryRoutes from "./src/routes/categoryRoute.js";
import pedidoRoutes from "./src/routes/pedidoRoute.js";
// import userRoutes from "./src/routes/userRoute.js"; // opcional

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/api/productos", productRoutes);
app.use("/api/categorias", categoryRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/pedidos", pedidoRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
let carrito = [];
let total = 0;


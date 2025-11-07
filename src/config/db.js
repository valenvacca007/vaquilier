import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error de conexión", err));
  import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/tu_basededatos")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;

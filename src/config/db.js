import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoute from "../routes/productRoute.js"; // import de tu router

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api/products", productRoute);

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error.message);
    process.exit(1);
  }
};

// Iniciar servidor solo después de conectar a la DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});

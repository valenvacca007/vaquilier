// src/models/categoryModel.js
import mongoose from "mongoose"; // ✅ importar mongoose

const categorySchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String
});

export default mongoose.model("Categoria", categorySchema);

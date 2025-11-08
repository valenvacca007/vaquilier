import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: Number,
  stock: Number,
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" }
});

export default mongoose.model("Producto", productSchema);


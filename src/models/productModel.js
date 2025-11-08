// src/models/productModel.js
import mongoose from "mongoose";

// Esquema de categoría (puede ajustarse según tu proyecto)
const categorySchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String
});

// Esquema de producto
const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: String,
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  stock: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Modelos
const Product = mongoose.model("Product", productSchema);
const Category = mongoose.model("Category", categorySchema);

// Export default para Product (el más usado)
export default Product;

// Export nombrado para Category si lo necesitás
export { Category };

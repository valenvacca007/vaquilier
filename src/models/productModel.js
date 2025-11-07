import * as productService from "../services/productService.js";

export const getProducts = async (req, res) => {
  try {
    const productos = await productService.getAllProducts();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String
});

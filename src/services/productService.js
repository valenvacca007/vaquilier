import Categoria from "../models/categoryModel.js";

export const getAllCategories = async () => await Categoria.find();
export const getCategoryById = async (id) => await Categoria.findById(id);
export const createCategory = async (data) => await Categoria.create(data);
export const updateCategory = async (id, data) => await Categoria.findByIdAndUpdate(id, data, { new: true });
export const deleteCategory = async (id) => await Categoria.findByIdAndDelete(id);
import Product from "../models/productModel.js";

// Crear producto
export const createProduct = async (data) => {
  const producto = new Product(data);
  return await producto.save();
};

// Obtener todos
export const getAllProducts = async () => {
  return await Product.find();
};

// Obtener uno
export const getProductById = async (id) => {
  return await Product.findById(id);
};

// Actualizar
export const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

// Eliminar
export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

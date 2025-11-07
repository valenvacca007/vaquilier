"../models/categoryModel.js";

export const getAllCategories = async () => await Categoria.find();
export const getCategoryById = async (id) => await Categoria.findById(id);
export const createCategory = async (data) => await Categoria.create(data);
export const updateCategory = async (id, data) => await Categoria.findByIdAndUpdate(id, data, { new: true });
export const deleteCategory = async (id) => await Categoria.findByIdAndDelete(id);
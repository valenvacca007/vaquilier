import * as categoryService from "../services/categoryService.js";

export const getCategories = async (req, res) => {
  try {
    const categorias = await categoryService.getAllCategories();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const nueva = await categoryService.createCategory(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
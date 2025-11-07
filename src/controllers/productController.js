import * as productService from "../services/productService.js";

export const getProducts = async (req, res) => {
  try {
    const productos = await productService.getAllProducts();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const nuevo = await productService.createProduct(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
import * as productService from "../services/productService.js";

export const create = async (req, res) => {
  try {
    const nuevo = await productService.createProduct(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

export const getAll = async (req, res) => {
  try {
    const productos = await productService.getAllProducts();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

export const getOne = async (req, res) => {
  try {
    const producto = await productService.getProductById(req.params.id);
    if (!producto) return res.status(404).json({ message: "No encontrado" });
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error });
  }
};

export const update = async (req, res) => {
  try {
    const producto = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar", error });
  }
};

export const remove = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar", error });
  }
};

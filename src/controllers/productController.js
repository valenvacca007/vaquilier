// src/controllers/productController.js
import * as productService from "../services/productService.js";

// Obtener todos los productos
export const getAll = async (req, res) => {
  try {
    const productos = await productService.getAllProducts();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// Obtener un producto por ID
export const getOne = async (req, res) => {
  try {
    const producto = await productService.getProductById(req.params.id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error });
  }
};

// Crear un nuevo producto
export const create = async (req, res) => {
  try {
    const nuevo = await productService.createProduct(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

// Actualizar un producto existente
export const update = async (req, res) => {
  try {
    const producto = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

// Eliminar un producto
export const remove = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};

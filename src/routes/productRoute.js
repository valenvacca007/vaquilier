
// src/routes/productRoute.js
import express from "express";
import { getAll, getOne, create, update, remove } from "../controllers/productController.js";

const router = express.Router();

// Rutas de productos
router
  .get("/", getAll)          // Obtener todos los productos
  .get("/:id", getOne)       // Obtener un producto por ID
  .post("/", create)         // Crear un producto
  .put("/:id", update)       // Actualizar un producto
  .delete("/:id", remove);   // Eliminar un producto

export default router;

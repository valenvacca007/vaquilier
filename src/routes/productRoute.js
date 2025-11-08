
// src/routes/productRoute.js
import express from "express";
import { getAll, getOne, create, update, remove } from "../controllers/productController.js";

const router = express.Router();

// Rutas de productos
router
  .get("/", getAll)        
  .get("/:id", getOne)       
  .post("/", create)        
  .put("/:id", update)       
  .delete("/:id", remove);   

export default router;

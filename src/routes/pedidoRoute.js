
import express from "express";
import { enviarPedidoEmail } from "../controllers/pedidoController.js";

const router = express.Router();

router.post("/email", enviarPedidoEmail);

export default router;

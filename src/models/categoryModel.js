
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String }
});

export default mongoose.model("Categoria", categorySchema);

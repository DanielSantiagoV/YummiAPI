import { Router } from "express";
import { 
    obtenerIngredientesDeReceta,
    agregarUnIngrediente,
    eliminarUnIngrediente,
    buscarRecetasPorIngredienteController
} from "../controllers/ingredientes.controller.js";

const router = Router();

// Obtener ingredientes de una receta específica
router.get("/receta/:recetaId", obtenerIngredientesDeReceta);

// Buscar recetas por ingrediente
router.get("/buscar", buscarRecetasPorIngredienteController);

// Agregar ingrediente a una receta
router.post("/", agregarUnIngrediente);

// Eliminar ingrediente de una receta
router.delete("/:id/receta/:recetaId", eliminarUnIngrediente);

export default router;


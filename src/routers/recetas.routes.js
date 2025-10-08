import { Router } from "express";
import { 
    obtenerTodasLasRecetas,
    obtenerReceta,
    obtenerRecetasDeUsuario,
    crearUnaReceta,
    actualizarUnaReceta,
    eliminarUnaReceta
} from "../controllers/recetas.controller.js";

const router = Router();

router.get("/", obtenerTodasLasRecetas);
router.get("/:id", obtenerReceta);
router.get("/usuario/:usuarioId", obtenerRecetasDeUsuario);
router.post("/", crearUnaReceta);
router.patch("/:id", actualizarUnaReceta);
router.delete("/:id", eliminarUnaReceta);

export default router;


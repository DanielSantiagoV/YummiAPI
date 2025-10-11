// Importación de Express Router para crear rutas modulares
import { Router } from "express";
// Importación de controladores para manejo de ingredientes
import { 
    obtenerIngredientesDeReceta,
    agregarUnIngrediente,
    eliminarUnIngrediente,
    buscarRecetasPorIngredienteController
} from "../controllers/ingredientes.controller.js";

// Creación de instancia del router para ingredientes
const router = Router();

/**
 * RUTAS PARA GESTIÓN DE INGREDIENTES
 * 
 * Este archivo define todas las rutas relacionadas con la gestión de ingredientes
 * en el sistema de recetas. Las rutas permiten:
 * - Obtener ingredientes de recetas específicas
 * - Buscar recetas por ingrediente
 * - Agregar nuevos ingredientes
 * - Eliminar ingredientes existentes
 */

// ===== RUTAS GET =====

/**
 * GET /receta/:recetaId
 * Obtiene todos los ingredientes de una receta específica
 * @param {number} recetaId - ID de la receta en los parámetros de la URL
 * @returns {Object} Lista de ingredientes de la receta
 */
router.get("/receta/:recetaId", obtenerIngredientesDeReceta);

/**
 * GET /buscar?nombre=nombreIngrediente
 * Busca recetas que contengan un ingrediente específico
 * @param {string} nombre - Nombre del ingrediente en query parameters
 * @returns {Object} Lista de recetas que contienen el ingrediente
 */
router.get("/buscar", buscarRecetasPorIngredienteController);

// ===== RUTAS POST =====

/**
 * POST /
 * Agrega un nuevo ingrediente a una receta
 * @param {Object} body - Datos del ingrediente (nombre, cantidad, unidad, recetaId)
 * @returns {Object} Confirmación de creación del ingrediente
 */
router.post("/", agregarUnIngrediente);

// ===== RUTAS DELETE =====

/**
 * DELETE /:id/receta/:recetaId
 * Elimina un ingrediente específico de una receta
 * @param {number} id - ID del ingrediente a eliminar
 * @param {number} recetaId - ID de la receta de la cual eliminar el ingrediente
 * @returns {Object} Confirmación de eliminación
 */
router.delete("/:id/receta/:recetaId", eliminarUnIngrediente);

// Exportación del router configurado
export default router;


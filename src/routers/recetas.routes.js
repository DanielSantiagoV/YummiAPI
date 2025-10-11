// Importación de Express Router para crear rutas modulares
import { Router } from "express";
// Importación de controladores para manejo de recetas
import { 
    obtenerTodasLasRecetas,
    obtenerReceta,
    obtenerRecetasDeUsuario,
    crearUnaReceta,
    actualizarUnaReceta,
    eliminarUnaReceta
} from "../controllers/recetas.controller.js";

// Creación de instancia del router para recetas
const router = Router();

/**
 * RUTAS PARA GESTIÓN DE RECETAS
 * 
 * Este archivo define todas las rutas relacionadas con la gestión de recetas
 * en el sistema culinario. Las rutas permiten:
 * - Obtener todas las recetas o recetas específicas
 * - Obtener recetas por usuario
 * - Crear nuevas recetas
 * - Actualizar recetas existentes
 * - Eliminar recetas
 */

// ===== RUTAS GET =====

/**
 * GET /
 * Obtiene todas las recetas del sistema
 * @returns {Object} Lista completa de todas las recetas
 */
router.get("/", obtenerTodasLasRecetas);

/**
 * GET /:id
 * Obtiene una receta específica por su ID, incluyendo sus ingredientes
 * @param {number} id - ID de la receta en los parámetros de la URL
 * @returns {Object} Datos completos de la receta con ingredientes
 */
router.get("/:id", obtenerReceta);

/**
 * GET /usuario/:usuarioId
 * Obtiene todas las recetas creadas por un usuario específico
 * @param {number} usuarioId - ID del usuario en los parámetros de la URL
 * @returns {Object} Lista de recetas del usuario
 */
router.get("/usuario/:usuarioId", obtenerRecetasDeUsuario);

// ===== RUTAS POST =====

/**
 * POST /
 * Crea una nueva receta
 * @param {Object} body - Datos de la receta (nombre, descripción, instrucciones, usuarioId, etc.)
 * @returns {Object} Confirmación de creación de la receta
 */
router.post("/", crearUnaReceta);

// ===== RUTAS PATCH =====

/**
 * PATCH /:id
 * Actualiza una receta existente
 * @param {number} id - ID de la receta a actualizar
 * @param {Object} body - Datos actualizados de la receta
 * @returns {Object} Confirmación de actualización
 */
router.patch("/:id", actualizarUnaReceta);

// ===== RUTAS DELETE =====

/**
 * DELETE /:id
 * Elimina una receta específica
 * @param {number} id - ID de la receta a eliminar
 * @returns {Object} Confirmación de eliminación
 */
router.delete("/:id", eliminarUnaReceta);

// Exportación del router configurado
export default router;


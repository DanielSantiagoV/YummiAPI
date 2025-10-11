// Importación de Express Router para crear rutas modulares
import { Router } from "express";
// Importación de controladores para manejo de usuarios
import { 
    obtenerTodosLosUsuarios,
    obtenerUsuario,
    crearUnUsuario,
    actualizarUnUsuario,
    eliminarUnUsuario
} from "../controllers/usuarios.controller.js";

// Creación de instancia del router para usuarios
const router = Router();

/**
 * RUTAS PARA GESTIÓN DE USUARIOS
 * 
 * Este archivo define todas las rutas relacionadas con la gestión de usuarios
 * en el sistema culinario. Las rutas permiten:
 * - Obtener todos los usuarios o usuarios específicos
 * - Crear nuevos usuarios
 * - Actualizar usuarios existentes
 * - Eliminar usuarios
 */

// ===== RUTAS GET =====

/**
 * GET /
 * Obtiene todos los usuarios del sistema
 * @returns {Object} Lista completa de todos los usuarios
 */
router.get("/", obtenerTodosLosUsuarios);

/**
 * GET /:id
 * Obtiene un usuario específico por su ID
 * @param {number} id - ID del usuario en los parámetros de la URL
 * @returns {Object} Datos completos del usuario
 */
router.get("/:id", obtenerUsuario);

// ===== RUTAS POST =====

/**
 * POST /
 * Crea un nuevo usuario
 * @param {Object} body - Datos del usuario (nombre, email, etc.)
 * @returns {Object} Confirmación de creación del usuario
 */
router.post("/", crearUnUsuario);

// ===== RUTAS PATCH =====

/**
 * PATCH /:id
 * Actualiza un usuario existente
 * @param {number} id - ID del usuario a actualizar
 * @param {Object} body - Datos actualizados del usuario
 * @returns {Object} Confirmación de actualización
 */
router.patch("/:id", actualizarUnUsuario);

// ===== RUTAS DELETE =====

/**
 * DELETE /:id
 * Elimina un usuario específico
 * @param {number} id - ID del usuario a eliminar
 * @returns {Object} Confirmación de eliminación
 */
router.delete("/:id", eliminarUnUsuario);

// Exportación del router configurado
export default router;


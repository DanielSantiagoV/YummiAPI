// Importación de servicios para manejo de recetas
import { 
    obtenerRecetas, 
    obtenerRecetaPorId, 
    obtenerRecetasPorUsuario,
    crearReceta, 
    actualizarReceta, 
    eliminarReceta 
} from "../services/recetas.services.js";

// Importación de la función para obtener la conexión a la base de datos
import { obtenerBD } from "../config/db.js";

/**
 * Controlador para obtener todas las recetas del sistema
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function obtenerTodasLasRecetas(req, res) {
    try {
        // Obtiene todas las recetas desde el servicio
        const recetas = await obtenerRecetas();
        // Retorna respuesta exitosa con todas las recetas
        res.status(200).json({
            message: "Recetas obtenidas exitosamente",
            count: recetas.length,
            recetas
        });
    } catch (error) {
        // Manejo de errores del servidor
        res.status(500).json({error: "Error al obtener las recetas"});
    }
}

/**
 * Controlador para obtener una receta específica por su ID, incluyendo sus ingredientes
 * @param {Object} req - Objeto de petición HTTP (contiene id en params)
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function obtenerReceta(req, res) {
    try {
        // Extrae el ID de la receta de los parámetros de la URL
        const id = parseInt(req.params.id);
        // Obtiene la receta desde el servicio
        const receta = await obtenerRecetaPorId(id);
        // Verifica que la receta exista
        if(!receta) return res.status(404).json({error: "Receta no encontrada"});
        
        // Obtiene los ingredientes asociados a la receta desde la base de datos
        const ingredientes = await obtenerBD().collection("ingredientes").find({recetaId: id}).toArray();
        // Agrega los ingredientes al objeto receta
        receta.ingredientes = ingredientes;
        
        // Retorna la receta completa con sus ingredientes
        res.status(200).json({
            message: "Receta obtenida exitosamente",
            receta
        });
    } catch (error) {
        // Manejo de errores del servidor
        res.status(500).json({error: "Error al obtener la receta"});
    }
}

/**
 * Controlador para obtener todas las recetas de un usuario específico
 * @param {Object} req - Objeto de petición HTTP (contiene usuarioId en params)
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function obtenerRecetasDeUsuario(req, res) {
    try {
        // Extrae el ID del usuario de los parámetros de la URL
        const usuarioId = parseInt(req.params.usuarioId);
        // Obtiene las recetas del usuario desde el servicio
        const recetas = await obtenerRecetasPorUsuario(usuarioId);
        // Retorna las recetas del usuario
        res.status(200).json({
            message: `Recetas del usuario ${usuarioId} obtenidas exitosamente`,
            count: recetas.length,
            recetas
        });
    } catch (error) {
        // Manejo de errores del servidor
        res.status(500).json({error: "Error al obtener las recetas del usuario"});
    }
}

/**
 * Controlador para crear una nueva receta
 * @param {Object} req - Objeto de petición HTTP (contiene los datos de la receta en req.body)
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function crearUnaReceta(req, res) {
    try {
        // Llama al servicio para crear la receta
        const result = await crearReceta(req.body);
        // Retorna respuesta de creación exitosa
        res.status(201).json(result);
    } catch (error) {
        // Manejo de errores de validación o datos incorrectos
        res.status(400).json({error: error.message});
    }
}

/**
 * Controlador para actualizar una receta existente
 * @param {Object} req - Objeto de petición HTTP (contiene id en params y datos actualizados en req.body)
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function actualizarUnaReceta(req, res) {
    try {
        // Extrae el ID de la receta de los parámetros
        const id = parseInt(req.params.id);
        // Llama al servicio para actualizar la receta
        const result = await actualizarReceta(id, req.body);
        // Retorna respuesta exitosa
        res.status(200).json(result);
    } catch (error) {
        // Manejo de errores cuando la receta no existe
        res.status(404).json({error: error.message});
    }
}

/**
 * Controlador para eliminar una receta específica
 * @param {Object} req - Objeto de petición HTTP (contiene id en params)
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function eliminarUnaReceta(req, res) {
    try {
        // Extrae el ID de la receta de los parámetros
        const id = parseInt(req.params.id);
        // Llama al servicio para eliminar la receta
        const result = await eliminarReceta(id);
        // Retorna respuesta exitosa
        res.status(200).json(result);
    } catch (error) {
        // Manejo de errores cuando la receta no existe
        res.status(404).json({error: error.message});
    }
}


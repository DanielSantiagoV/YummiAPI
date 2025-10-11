// Importación de servicios para manejo de ingredientes
import { 
    obtenerIngredientesPorReceta,
    agregarIngrediente, 
    eliminarIngrediente,
    buscarRecetasPorIngrediente
} from "../services/ingredientes.services.js";

/**
 * Controlador para obtener todos los ingredientes de una receta específica
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function obtenerIngredientesDeReceta(req, res) {
    try {
        // Extrae el ID de la receta de los parámetros de la URL
        const recetaId = parseInt(req.params.recetaId);
        // Obtiene los ingredientes de la receta desde el servicio
        const ingredientes = await obtenerIngredientesPorReceta(recetaId);
        // Retorna respuesta exitosa con los ingredientes
        res.status(200).json({
            message: `Ingredientes de la receta ${recetaId} obtenidos exitosamente`,
            count: ingredientes.length,
            ingredientes
        });
    } catch (error) {
        // Manejo de errores del servidor
        res.status(500).json({error: "Error al obtener los ingredientes de la receta"});
    }
}

/**
 * Controlador para agregar un nuevo ingrediente a una receta
 * @param {Object} req - Objeto de petición HTTP (contiene los datos del ingrediente en req.body)
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function agregarUnIngrediente(req, res) {
    try {
        // Llama al servicio para agregar el ingrediente
        const result = await agregarIngrediente(req.body);
        // Retorna respuesta de creación exitosa
        res.status(201).json(result);
    } catch (error) {
        // Manejo de errores de validación o datos incorrectos
        res.status(400).json({error: error.message});
    }
}

/**
 * Controlador para eliminar un ingrediente específico de una receta
 * @param {Object} req - Objeto de petición HTTP (contiene id del ingrediente y recetaId)
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function eliminarUnIngrediente(req, res) {
    try {
        // Extrae el ID del ingrediente y el ID de la receta de los parámetros
        const { id, recetaId } = req.params;
        // Llama al servicio para eliminar el ingrediente
        const result = await eliminarIngrediente(id, recetaId);
        // Retorna respuesta exitosa
        res.status(200).json(result);
    } catch (error) {
        // Manejo de errores cuando el ingrediente no existe
        res.status(404).json({error: error.message});
    }
}

/**
 * Controlador para buscar recetas que contengan un ingrediente específico
 * @param {Object} req - Objeto de petición HTTP (contiene nombre del ingrediente en query params)
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function buscarRecetasPorIngredienteController(req, res) {
    try {
        // Extrae el nombre del ingrediente de los query parameters
        const { nombre } = req.query;
        // Valida que se proporcione el parámetro nombre
        if(!nombre) {
            return res.status(400).json({error: "Debe proporcionar el parámetro 'nombre' para buscar"});
        }
        
        // Busca las recetas que contengan el ingrediente especificado
        const recetas = await buscarRecetasPorIngrediente(nombre);
        // Retorna las recetas encontradas
        res.status(200).json({
            message: `Recetas encontradas con el ingrediente '${nombre}'`,
            count: recetas.length,
            recetas
        });
    } catch (error) {
        // Manejo de errores del servidor
        res.status(500).json({error: "Error al buscar recetas por ingrediente"});
    }
}


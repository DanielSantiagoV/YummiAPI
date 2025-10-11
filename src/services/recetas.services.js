// Importación de la función para obtener la conexión a la base de datos
import { obtenerBD } from "../config/db.js";

// Constante que define el nombre de la colección de recetas en MongoDB
const COLECCION_RECETAS = "recetas"

/**
 * SERVICIOS PARA GESTIÓN DE RECETAS
 * 
 * Este archivo contiene todas las funciones de servicio para la gestión de recetas
 * en el sistema culinario. Los servicios manejan la lógica de negocio y las
 * operaciones con la base de datos MongoDB.
 */

/**
 * Obtiene todas las recetas del sistema
 * @returns {Array} Lista completa de todas las recetas
 */
export async function obtenerRecetas() {
    // Busca todas las recetas en la colección
    return await obtenerBD().collection(COLECCION_RECETAS).find().toArray();
}

/**
 * Obtiene una receta específica por su ID
 * @param {number} id - ID de la receta
 * @returns {Object|null} Datos de la receta o null si no existe
 */
export async function obtenerRecetaPorId(id) {
    // Busca una receta específica por su ID
    return await obtenerBD().collection(COLECCION_RECETAS).findOne({id});
}

/**
 * Obtiene todas las recetas creadas por un usuario específico
 * @param {number} usuarioId - ID del usuario
 * @returns {Array} Lista de recetas del usuario
 */
export async function obtenerRecetasPorUsuario(usuarioId) {
    // Busca todas las recetas que pertenecen al usuario especificado
    return await obtenerBD().collection(COLECCION_RECETAS).find({usuarioId: parseInt(usuarioId)}).toArray();
}

/**
 * Crea una nueva receta en el sistema
 * @param {Object} datos - Datos de la receta (id, titulo, descripcion, usuarioId)
 * @returns {Object} Confirmación de creación y datos de la receta
 * @throws {Error} Si faltan campos obligatorios, la receta ya existe, o el usuario no existe
 */
export async function crearReceta(datos) {
    // Extrae los campos necesarios del objeto datos
    const {id, titulo, descripcion, usuarioId} = datos;
    
    // Valida que todos los campos obligatorios estén presentes
    if(!id || !titulo || !descripcion || !usuarioId){
        throw new Error("Faltan campos obligatorios: id, titulo, descripcion, usuarioId");
    }

    // Verifica si la receta ya existe para evitar duplicados
    const recetaExistente = await obtenerRecetaPorId(id);
    if(recetaExistente) {
        throw new Error("Ya existe una receta con ese ID");
    }

    // Verifica que el usuario existe antes de crear la receta
    const usuario = await obtenerBD().collection("usuarios").findOne({id: parseInt(usuarioId)});
    if(!usuario) {
        throw new Error("El usuario especificado no existe");
    }

    // Crea el objeto receta con los datos proporcionados
    const receta = {
        id,
        titulo,
        descripcion,
        usuarioId: parseInt(usuarioId),
        fechaCreacion: new Date().toISOString(), // Agrega timestamp de creación
        ingredientes: [] // Inicializa array vacío de ingredientes
    }

    // Inserta la receta en la base de datos
    await obtenerBD().collection(COLECCION_RECETAS).insertOne(receta);
    return {message: "Receta creada exitosamente", receta};
}

/**
 * Actualiza una receta existente
 * @param {number} id - ID de la receta a actualizar
 * @param {Object} datos - Datos actualizados de la receta
 * @returns {Object} Confirmación de actualización
 * @throws {Error} Si no se proporcionan campos para actualizar o la receta no existe
 */
export async function actualizarReceta(id, datos) {
    // Extrae los campos que se pueden actualizar
    const {titulo, descripcion} = datos;
    
    // Valida que al menos un campo sea proporcionado para actualizar
    if(!titulo && !descripcion) {
        throw new Error("Debe proporcionar al menos un campo para actualizar");
    }

    // Actualiza la receta con los nuevos datos
    const resultado = await obtenerBD().collection(COLECCION_RECETAS).updateOne({id}, {$set: datos});
    
    // Verifica que se encontró y actualizó al menos un documento
    if(resultado.matchedCount === 0) throw new Error("Receta no encontrada");
    return {message: "Receta actualizada exitosamente"};
}

/**
 * Elimina una receta y todos sus ingredientes asociados
 * @param {number} id - ID de la receta a eliminar
 * @returns {Object} Confirmación de eliminación
 * @throws {Error} Si la receta no existe
 */
export async function eliminarReceta(id) {
    // Primero elimina todos los ingredientes asociados a la receta
    await obtenerBD().collection("ingredientes").deleteMany({recetaId: parseInt(id)});
    
    // Luego elimina la receta
    const resultado = await obtenerBD().collection(COLECCION_RECETAS).deleteOne({id});
    
    // Verifica que se eliminó al menos un documento
    if (resultado.deletedCount === 0) throw new Error("Receta no encontrada");
    return {message: "Receta y todos sus ingredientes eliminados exitosamente"};
}


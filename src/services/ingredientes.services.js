// Importación de la función para obtener la conexión a la base de datos
import { obtenerBD } from "../config/db.js";

// Constante que define el nombre de la colección de ingredientes en MongoDB
const COLECCION_INGREDIENTES = "ingredientes"

/**
 * SERVICIOS PARA GESTIÓN DE INGREDIENTES
 * 
 * Este archivo contiene todas las funciones de servicio para la gestión de ingredientes
 * en el sistema de recetas. Los servicios manejan la lógica de negocio y las
 * operaciones con la base de datos MongoDB.
 */

/**
 * Obtiene todos los ingredientes de una receta específica
 * @param {number} recetaId - ID de la receta
 * @returns {Array} Lista de ingredientes de la receta
 */
export async function obtenerIngredientesPorReceta(recetaId) {
    // Busca todos los ingredientes que pertenecen a la receta especificada
    return await obtenerBD().collection(COLECCION_INGREDIENTES).find({recetaId: parseInt(recetaId)}).toArray();
}

/**
 * Agrega un nuevo ingrediente a una receta
 * @param {Object} datos - Datos del ingrediente (id, nombre, recetaId)
 * @returns {Object} Confirmación de creación y datos del ingrediente
 * @throws {Error} Si faltan campos obligatorios, el ingrediente ya existe, o la receta no existe
 */
export async function agregarIngrediente(datos) {
    // Extrae los campos necesarios del objeto datos
    const {id, nombre, recetaId} = datos;
    
    // Valida que todos los campos obligatorios estén presentes
    if(!id || !nombre || !recetaId){
        throw new Error("Faltan campos obligatorios: id, nombre, recetaId");
    }

    // Verifica si el ingrediente ya existe en esa receta para evitar duplicados
    const ingredienteExistente = await obtenerBD().collection(COLECCION_INGREDIENTES).findOne({
        id: parseInt(id),
        recetaId: parseInt(recetaId)
    });
    if(ingredienteExistente) {
        throw new Error("Ya existe un ingrediente con ese ID en esta receta");
    }

    // Verifica que la receta existe antes de agregar el ingrediente
    const receta = await obtenerBD().collection("recetas").findOne({id: parseInt(recetaId)});
    if(!receta) {
        throw new Error("La receta especificada no existe");
    }

    // Crea el objeto ingrediente con los datos proporcionados
    const ingrediente = {
        id: parseInt(id),
        nombre,
        recetaId: parseInt(recetaId),
        fechaAgregado: new Date().toISOString() // Agrega timestamp de creación
    }

    // Inserta el ingrediente en la base de datos
    await obtenerBD().collection(COLECCION_INGREDIENTES).insertOne(ingrediente);
    return {message: "Ingrediente agregado exitosamente", ingrediente};
}

/**
 * Elimina un ingrediente específico de una receta
 * @param {number} id - ID del ingrediente a eliminar
 * @param {number} recetaId - ID de la receta
 * @returns {Object} Confirmación de eliminación
 * @throws {Error} Si el ingrediente no se encuentra en la receta
 */
export async function eliminarIngrediente(id, recetaId) {
    // Elimina el ingrediente específico de la receta especificada
    const resultado = await obtenerBD().collection(COLECCION_INGREDIENTES).deleteOne({
        id: parseInt(id),
        recetaId: parseInt(recetaId)
    });
    
    // Verifica que se eliminó al menos un documento
    if (resultado.deletedCount === 0) throw new Error("Ingrediente no encontrado en esta receta");
    return {message: "Ingrediente eliminado exitosamente"};
}

/**
 * Busca recetas que contengan un ingrediente específico
 * @param {string} nombreIngrediente - Nombre del ingrediente a buscar
 * @returns {Array} Lista de recetas que contienen el ingrediente
 */
export async function buscarRecetasPorIngrediente(nombreIngrediente) {
    // Busca ingredientes que contengan el nombre especificado (búsqueda insensible a mayúsculas)
    const ingredientes = await obtenerBD().collection(COLECCION_INGREDIENTES).find({
        nombre: { $regex: nombreIngrediente, $options: 'i' } // Regex case-insensitive
    }).toArray();

    // Si no se encuentran ingredientes, retorna array vacío
    if(ingredientes.length === 0) {
        return [];
    }

    // Extrae los IDs únicos de las recetas que contienen el ingrediente
    const recetaIds = ingredientes.map(ing => ing.recetaId);
    
    // Obtiene las recetas completas que contienen el ingrediente
    const recetas = await obtenerBD().collection("recetas").find({
        id: { $in: recetaIds } // Busca recetas cuyo ID esté en la lista de IDs encontrados
    }).toArray();

    // Enriquece cada receta con información de los ingredientes encontrados
    const recetasConIngredientes = recetas.map(receta => {
        // Filtra los ingredientes que pertenecen a esta receta específica
        const ingredientesDeReceta = ingredientes.filter(ing => ing.recetaId === receta.id);
        return {
            ...receta, // Copia todas las propiedades de la receta
            ingredientesEncontrados: ingredientesDeReceta // Agrega los ingredientes encontrados
        };
    });

    return recetasConIngredientes;
}


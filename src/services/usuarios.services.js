// Importación de la función para obtener la conexión a la base de datos
import { obtenerBD } from "../config/db.js";

// Constante que define el nombre de la colección de usuarios en MongoDB
const COLECCION_USUARIOS = "usuarios"

/**
 * SERVICIOS PARA GESTIÓN DE USUARIOS
 * 
 * Este archivo contiene todas las funciones de servicio para la gestión de usuarios
 * en el sistema culinario. Los servicios manejan la lógica de negocio y las
 * operaciones con la base de datos MongoDB.
 */

/**
 * Obtiene todos los usuarios del sistema
 * @returns {Array} Lista completa de todos los usuarios
 */
export async function obtenerUsuarios() {
    // Busca todos los usuarios en la colección
    return await obtenerBD().collection(COLECCION_USUARIOS).find().toArray();
}

/**
 * Obtiene un usuario específico por su ID
 * @param {number} id - ID del usuario
 * @returns {Object|null} Datos del usuario o null si no existe
 */
export async function obtenerUsuarioPorId(id) {
    // Busca un usuario específico por su ID
    return await obtenerBD().collection(COLECCION_USUARIOS).findOne({id});
}

/**
 * Crea un nuevo usuario en el sistema
 * @param {Object} datos - Datos del usuario (id, nombre, email, fechaRegistro)
 * @returns {Object} Confirmación de creación y datos del usuario
 * @throws {Error} Si faltan campos obligatorios o el usuario ya existe
 */
export async function crearUsuario(datos) {
    // Extrae los campos necesarios del objeto datos
    const {id, nombre, email, fechaRegistro} = datos
    
    // Valida que todos los campos obligatorios estén presentes
    if(!id || !nombre || !email){
        throw new Error("Faltan campos obligatorios: id, nombre, email");
    }

    // Verifica si el usuario ya existe para evitar duplicados
    const usuarioExistente = await obtenerUsuarioPorId(id);
    if(usuarioExistente) {
        throw new Error("Ya existe un usuario con ese ID");
    }

    // Crea el objeto usuario con los datos proporcionados
    const usuario = {
        id,
        nombre,
        email,
        fechaRegistro: fechaRegistro || new Date().toISOString() // Usa fecha proporcionada o actual
    }

    // Inserta el usuario en la base de datos
    await obtenerBD().collection(COLECCION_USUARIOS).insertOne(usuario);
    return {message: "Usuario creado exitosamente", usuario};
}

/**
 * Actualiza un usuario existente
 * @param {number} id - ID del usuario a actualizar
 * @param {Object} datos - Datos actualizados del usuario
 * @returns {Object} Confirmación de actualización
 * @throws {Error} Si no se proporcionan campos para actualizar o el usuario no existe
 */
export async function actualizarUsuario(id, datos) {
    // Extrae los campos que se pueden actualizar
    const {nombre, email} = datos;
    
    // Valida que al menos un campo sea proporcionado para actualizar
    if(!nombre && !email) {
        throw new Error("Debe proporcionar al menos un campo para actualizar");
    }

    // Actualiza el usuario con los nuevos datos
    const resultado = await obtenerBD().collection(COLECCION_USUARIOS).updateOne({id}, {$set: datos});
    
    // Verifica que se encontró y actualizó al menos un documento
    if(resultado.matchedCount === 0) throw new Error("Usuario no encontrado");
    return {message: "Usuario actualizado exitosamente"};
}

/**
 * Elimina un usuario y todas sus recetas asociadas
 * @param {number} id - ID del usuario a eliminar
 * @returns {Object} Confirmación de eliminación
 * @throws {Error} Si el usuario no existe
 */
export async function eliminarUsuario(id) {
    // Primero elimina todas las recetas del usuario
    await obtenerBD().collection("recetas").deleteMany({usuarioId: id});
    
    // Luego elimina el usuario
    const resultado = await obtenerBD().collection(COLECCION_USUARIOS).deleteOne({id});
    
    // Verifica que se eliminó al menos un documento
    if (resultado.deletedCount === 0) throw new Error("Usuario no encontrado");
    return {message: "Usuario y todas sus recetas eliminados exitosamente"};
}


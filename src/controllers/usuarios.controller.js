// Importación de servicios para manejo de usuarios
import { 
    obtenerUsuarios, 
    obtenerUsuarioPorId, 
    crearUsuario, 
    actualizarUsuario, 
    eliminarUsuario 
} from "../services/usuarios.services.js";

/**
 * Controlador para obtener todos los usuarios del sistema
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function obtenerTodosLosUsuarios(req, res) {
    try {
        // Obtiene todos los usuarios desde el servicio
        const usuarios = await obtenerUsuarios();
        // Retorna respuesta exitosa con todos los usuarios
        res.status(200).json({
            message: "Usuarios obtenidos exitosamente",
            count: usuarios.length,
            usuarios
        });
    } catch (error) {
        // Manejo de errores del servidor
        res.status(500).json({error: "Error al obtener los usuarios"});
    }
}

/**
 * Controlador para obtener un usuario específico por su ID
 * @param {Object} req - Objeto de petición HTTP (contiene id en params)
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function obtenerUsuario(req, res) {
    try {
        // Extrae el ID del usuario de los parámetros de la URL
        const id = parseInt(req.params.id);
        // Obtiene el usuario desde el servicio
        const usuario = await obtenerUsuarioPorId(id);
        // Verifica que el usuario exista
        if(!usuario) return res.status(404).json({error: "Usuario no encontrado"});
        // Retorna el usuario encontrado
        res.status(200).json({
            message: "Usuario obtenido exitosamente",
            usuario
        });
    } catch (error) {
        // Manejo de errores del servidor
        res.status(500).json({error: "Error al obtener el usuario"});
    }
}

/**
 * Controlador para crear un nuevo usuario
 * @param {Object} req - Objeto de petición HTTP (contiene los datos del usuario en req.body)
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function crearUnUsuario(req, res) {
    try {
        // Llama al servicio para crear el usuario
        const result = await crearUsuario(req.body);
        // Retorna respuesta de creación exitosa
        res.status(201).json(result);
    } catch (error) {
        // Manejo de errores de validación o datos incorrectos
        res.status(400).json({error: error.message});
    }
}

/**
 * Controlador para actualizar un usuario existente
 * @param {Object} req - Objeto de petición HTTP (contiene id en params y datos actualizados en req.body)
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function actualizarUnUsuario(req, res) {
    try {
        // Extrae el ID del usuario de los parámetros
        const id = parseInt(req.params.id);
        // Llama al servicio para actualizar el usuario
        const result = await actualizarUsuario(id, req.body);
        // Retorna respuesta exitosa
        res.status(200).json(result);
    } catch (error) {
        // Manejo de errores cuando el usuario no existe
        res.status(404).json({error: error.message});
    }
}

/**
 * Controlador para eliminar un usuario específico
 * @param {Object} req - Objeto de petición HTTP (contiene id en params)
 * @param {Object} res - Objeto de respuesta HTTP
 */
export async function eliminarUnUsuario(req, res) {
    try {
        // Extrae el ID del usuario de los parámetros
        const id = parseInt(req.params.id);
        // Llama al servicio para eliminar el usuario
        const result = await eliminarUsuario(id);
        // Retorna respuesta exitosa
        res.status(200).json(result);
    } catch (error) {
        // Manejo de errores cuando el usuario no existe
        res.status(404).json({error: error.message});
    }
}


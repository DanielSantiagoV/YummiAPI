import { obtenerBD } from "../config/db.js";

const COLECCION_USUARIOS = "usuarios"

export async function obtenerUsuarios() {
    return await obtenerBD().collection(COLECCION_USUARIOS).find().toArray();
}

export async function obtenerUsuarioPorId(id) {
    return await obtenerBD().collection(COLECCION_USUARIOS).findOne({id});
}

export async function crearUsuario(datos) {
    const {id, nombre, email, fechaRegistro} = datos
    if(!id || !nombre || !email){
        throw new Error("Faltan campos obligatorios: id, nombre, email");
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await obtenerUsuarioPorId(id);
    if(usuarioExistente) {
        throw new Error("Ya existe un usuario con ese ID");
    }

    const usuario = {
        id,
        nombre,
        email,
        fechaRegistro: fechaRegistro || new Date().toISOString()
    }

    await obtenerBD().collection(COLECCION_USUARIOS).insertOne(usuario);
    return {message: "Usuario creado exitosamente", usuario};
}

export async function actualizarUsuario(id, datos) {
    const {nombre, email} = datos;
    
    // Validar que al menos un campo sea proporcionado
    if(!nombre && !email) {
        throw new Error("Debe proporcionar al menos un campo para actualizar");
    }

    const resultado = await obtenerBD().collection(COLECCION_USUARIOS).updateOne({id}, {$set: datos});
    if(resultado.matchedCount === 0) throw new Error("Usuario no encontrado");
    return {message: "Usuario actualizado exitosamente"};
}

export async function eliminarUsuario(id) {
    // Primero eliminar todas las recetas del usuario
    await obtenerBD().collection("recetas").deleteMany({usuarioId: id});
    
    // Luego eliminar el usuario
    const resultado = await obtenerBD().collection(COLECCION_USUARIOS).deleteOne({id});
    if (resultado.deletedCount === 0) throw new Error("Usuario no encontrado");
    return {message: "Usuario y todas sus recetas eliminados exitosamente"};
}


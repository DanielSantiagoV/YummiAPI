import { obtenerBD } from "../config/db.js";

const COLECCION_RECETAS = "recetas"

export async function obtenerRecetas() {
    return await obtenerBD().collection(COLECCION_RECETAS).find().toArray();
}

export async function obtenerRecetaPorId(id) {
    return await obtenerBD().collection(COLECCION_RECETAS).findOne({id});
}

export async function obtenerRecetasPorUsuario(usuarioId) {
    return await obtenerBD().collection(COLECCION_RECETAS).find({usuarioId: parseInt(usuarioId)}).toArray();
}

export async function crearReceta(datos) {
    const {id, titulo, descripcion, usuarioId} = datos;
    if(!id || !titulo || !descripcion || !usuarioId){
        throw new Error("Faltan campos obligatorios: id, titulo, descripcion, usuarioId");
    }

    // Verificar si la receta ya existe
    const recetaExistente = await obtenerRecetaPorId(id);
    if(recetaExistente) {
        throw new Error("Ya existe una receta con ese ID");
    }

    // Verificar que el usuario existe
    const usuario = await obtenerBD().collection("usuarios").findOne({id: parseInt(usuarioId)});
    if(!usuario) {
        throw new Error("El usuario especificado no existe");
    }

    const receta = {
        id,
        titulo,
        descripcion,
        usuarioId: parseInt(usuarioId),
        fechaCreacion: new Date().toISOString(),
        ingredientes: []
    }

    await obtenerBD().collection(COLECCION_RECETAS).insertOne(receta);
    return {message: "Receta creada exitosamente", receta};
}

export async function actualizarReceta(id, datos) {
    const {titulo, descripcion} = datos;
    
    // Validar que al menos un campo sea proporcionado
    if(!titulo && !descripcion) {
        throw new Error("Debe proporcionar al menos un campo para actualizar");
    }

    const resultado = await obtenerBD().collection(COLECCION_RECETAS).updateOne({id}, {$set: datos});
    if(resultado.matchedCount === 0) throw new Error("Receta no encontrada");
    return {message: "Receta actualizada exitosamente"};
}

export async function eliminarReceta(id) {
    // Primero eliminar todos los ingredientes de la receta
    await obtenerBD().collection("ingredientes").deleteMany({recetaId: parseInt(id)});
    
    // Luego eliminar la receta
    const resultado = await obtenerBD().collection(COLECCION_RECETAS).deleteOne({id});
    if (resultado.deletedCount === 0) throw new Error("Receta no encontrada");
    return {message: "Receta y todos sus ingredientes eliminados exitosamente"};
}


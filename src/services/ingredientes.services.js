import { obtenerBD } from "../config/db.js";

const COLECCION_INGREDIENTES = "ingredientes"

export async function obtenerIngredientesPorReceta(recetaId) {
    return await obtenerBD().collection(COLECCION_INGREDIENTES).find({recetaId: parseInt(recetaId)}).toArray();
}

export async function agregarIngrediente(datos) {
    const {id, nombre, recetaId} = datos;
    if(!id || !nombre || !recetaId){
        throw new Error("Faltan campos obligatorios: id, nombre, recetaId");
    }

    // Verificar si el ingrediente ya existe en esa receta
    const ingredienteExistente = await obtenerBD().collection(COLECCION_INGREDIENTES).findOne({
        id: parseInt(id),
        recetaId: parseInt(recetaId)
    });
    if(ingredienteExistente) {
        throw new Error("Ya existe un ingrediente con ese ID en esta receta");
    }

    // Verificar que la receta existe
    const receta = await obtenerBD().collection("recetas").findOne({id: parseInt(recetaId)});
    if(!receta) {
        throw new Error("La receta especificada no existe");
    }

    const ingrediente = {
        id: parseInt(id),
        nombre,
        recetaId: parseInt(recetaId),
        fechaAgregado: new Date().toISOString()
    }

    await obtenerBD().collection(COLECCION_INGREDIENTES).insertOne(ingrediente);
    return {message: "Ingrediente agregado exitosamente", ingrediente};
}

export async function eliminarIngrediente(id, recetaId) {
    const resultado = await obtenerBD().collection(COLECCION_INGREDIENTES).deleteOne({
        id: parseInt(id),
        recetaId: parseInt(recetaId)
    });
    if (resultado.deletedCount === 0) throw new Error("Ingrediente no encontrado en esta receta");
    return {message: "Ingrediente eliminado exitosamente"};
}

export async function buscarRecetasPorIngrediente(nombreIngrediente) {
    // Buscar ingredientes que contengan el nombre especificado
    const ingredientes = await obtenerBD().collection(COLECCION_INGREDIENTES).find({
        nombre: { $regex: nombreIngrediente, $options: 'i' }
    }).toArray();

    if(ingredientes.length === 0) {
        return [];
    }

    // Obtener los IDs de las recetas
    const recetaIds = ingredientes.map(ing => ing.recetaId);
    
    // Obtener las recetas completas
    const recetas = await obtenerBD().collection("recetas").find({
        id: { $in: recetaIds }
    }).toArray();

    // Agregar información del ingrediente a cada receta
    const recetasConIngredientes = recetas.map(receta => {
        const ingredientesDeReceta = ingredientes.filter(ing => ing.recetaId === receta.id);
        return {
            ...receta,
            ingredientesEncontrados: ingredientesDeReceta
        };
    });

    return recetasConIngredientes;
}


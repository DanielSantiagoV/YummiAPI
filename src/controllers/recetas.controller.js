import { 
    obtenerRecetas, 
    obtenerRecetaPorId, 
    obtenerRecetasPorUsuario,
    crearReceta, 
    actualizarReceta, 
    eliminarReceta 
} from "../services/recetas.services.js";

export async function obtenerTodasLasRecetas(req, res) {
    try {
        const recetas = await obtenerRecetas();
        res.status(200).json({
            message: "Recetas obtenidas exitosamente",
            count: recetas.length,
            recetas
        });
    } catch (error) {
        res.status(500).json({error: "Error al obtener las recetas"});
    }
}

export async function obtenerReceta(req, res) {
    try {
        const id = parseInt(req.params.id);
        const receta = await obtenerRecetaPorId(id);
        if(!receta) return res.status(404).json({error: "Receta no encontrada"});
        
        // Obtener ingredientes de la receta
        const ingredientes = await obtenerBD().collection("ingredientes").find({recetaId: id}).toArray();
        receta.ingredientes = ingredientes;
        
        res.status(200).json({
            message: "Receta obtenida exitosamente",
            receta
        });
    } catch (error) {
        res.status(500).json({error: "Error al obtener la receta"});
    }
}

export async function obtenerRecetasDeUsuario(req, res) {
    try {
        const usuarioId = parseInt(req.params.usuarioId);
        const recetas = await obtenerRecetasPorUsuario(usuarioId);
        res.status(200).json({
            message: `Recetas del usuario ${usuarioId} obtenidas exitosamente`,
            count: recetas.length,
            recetas
        });
    } catch (error) {
        res.status(500).json({error: "Error al obtener las recetas del usuario"});
    }
}

export async function crearUnaReceta(req, res) {
    try {
        const result = await crearReceta(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export async function actualizarUnaReceta(req, res) {
    try {
        const id = parseInt(req.params.id);
        const result = await actualizarReceta(id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

export async function eliminarUnaReceta(req, res) {
    try {
        const id = parseInt(req.params.id);
        const result = await eliminarReceta(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

// Importar obtenerBD para usar en obtenerReceta
import { obtenerBD } from "../config/db.js";


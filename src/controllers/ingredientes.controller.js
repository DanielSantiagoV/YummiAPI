import { 
    obtenerIngredientesPorReceta,
    agregarIngrediente, 
    eliminarIngrediente,
    buscarRecetasPorIngrediente
} from "../services/ingredientes.services.js";

export async function obtenerIngredientesDeReceta(req, res) {
    try {
        const recetaId = parseInt(req.params.recetaId);
        const ingredientes = await obtenerIngredientesPorReceta(recetaId);
        res.status(200).json({
            message: `Ingredientes de la receta ${recetaId} obtenidos exitosamente`,
            count: ingredientes.length,
            ingredientes
        });
    } catch (error) {
        res.status(500).json({error: "Error al obtener los ingredientes de la receta"});
    }
}

export async function agregarUnIngrediente(req, res) {
    try {
        const result = await agregarIngrediente(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export async function eliminarUnIngrediente(req, res) {
    try {
        const { id, recetaId } = req.params;
        const result = await eliminarIngrediente(id, recetaId);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

export async function buscarRecetasPorIngredienteController(req, res) {
    try {
        const { nombre } = req.query;
        if(!nombre) {
            return res.status(400).json({error: "Debe proporcionar el parámetro 'nombre' para buscar"});
        }
        
        const recetas = await buscarRecetasPorIngrediente(nombre);
        res.status(200).json({
            message: `Recetas encontradas con el ingrediente '${nombre}'`,
            count: recetas.length,
            recetas
        });
    } catch (error) {
        res.status(500).json({error: "Error al buscar recetas por ingrediente"});
    }
}


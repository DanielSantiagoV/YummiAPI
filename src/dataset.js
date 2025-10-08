import { conectarBD, obtenerBD } from "./config/db.js";

// Datos de prueba para usuarios
const usuariosPrueba = [
    {
        id: 1,
        nombre: "María García",
        email: "maria.garcia@email.com",
        fechaRegistro: "2024-01-15T10:30:00Z"
    },
    {
        id: 2,
        nombre: "Juan Pérez",
        email: "juan.perez@email.com",
        fechaRegistro: "2024-01-20T14:45:00Z"
    },
    {
        id: 3,
        nombre: "Ana López",
        email: "ana.lopez@email.com",
        fechaRegistro: "2024-02-01T09:15:00Z"
    }
];

// Datos de prueba para recetas
const recetasPrueba = [
    {
        id: 1,
        titulo: "Pasta Carbonara",
        descripcion: "Deliciosa pasta italiana con huevo, queso parmesano y panceta",
        usuarioId: 1,
        fechaCreacion: "2024-01-16T12:00:00Z",
        ingredientes: []
    },
    {
        id: 2,
        titulo: "Pollo al Curry",
        descripcion: "Pollo cocinado con especias y leche de coco",
        usuarioId: 2,
        fechaCreacion: "2024-01-21T18:30:00Z",
        ingredientes: []
    },
    {
        id: 3,
        titulo: "Ensalada César",
        descripcion: "Ensalada fresca con lechuga, pollo, queso parmesano y aderezo especial",
        usuarioId: 1,
        fechaCreacion: "2024-01-25T11:20:00Z",
        ingredientes: []
    },
    {
        id: 4,
        titulo: "Tacos de Pollo",
        descripcion: "Tacos mexicanos con pollo marinado y vegetales frescos",
        usuarioId: 3,
        fechaCreacion: "2024-02-02T16:45:00Z",
        ingredientes: []
    }
];

// Datos de prueba para ingredientes
const ingredientesPrueba = [
    // Ingredientes para Pasta Carbonara (receta 1)
    { id: 1, nombre: "Pasta", recetaId: 1, fechaAgregado: "2024-01-16T12:05:00Z" },
    { id: 2, nombre: "Huevos", recetaId: 1, fechaAgregado: "2024-01-16T12:05:00Z" },
    { id: 3, nombre: "Queso Parmesano", recetaId: 1, fechaAgregado: "2024-01-16T12:05:00Z" },
    { id: 4, nombre: "Panceta", recetaId: 1, fechaAgregado: "2024-01-16T12:05:00Z" },
    { id: 5, nombre: "Pimienta Negra", recetaId: 1, fechaAgregado: "2024-01-16T12:05:00Z" },
    
    // Ingredientes para Pollo al Curry (receta 2)
    { id: 6, nombre: "Pollo", recetaId: 2, fechaAgregado: "2024-01-21T18:35:00Z" },
    { id: 7, nombre: "Leche de Coco", recetaId: 2, fechaAgregado: "2024-01-21T18:35:00Z" },
    { id: 8, nombre: "Curry en Polvo", recetaId: 2, fechaAgregado: "2024-01-21T18:35:00Z" },
    { id: 9, nombre: "Cebolla", recetaId: 2, fechaAgregado: "2024-01-21T18:35:00Z" },
    { id: 10, nombre: "Ajo", recetaId: 2, fechaAgregado: "2024-01-21T18:35:00Z" },
    
    // Ingredientes para Ensalada César (receta 3)
    { id: 11, nombre: "Lechuga", recetaId: 3, fechaAgregado: "2024-01-25T11:25:00Z" },
    { id: 12, nombre: "Pollo", recetaId: 3, fechaAgregado: "2024-01-25T11:25:00Z" },
    { id: 13, nombre: "Queso Parmesano", recetaId: 3, fechaAgregado: "2024-01-25T11:25:00Z" },
    { id: 14, nombre: "Crutones", recetaId: 3, fechaAgregado: "2024-01-25T11:25:00Z" },
    { id: 15, nombre: "Aderezo César", recetaId: 3, fechaAgregado: "2024-01-25T11:25:00Z" },
    
    // Ingredientes para Tacos de Pollo (receta 4)
    { id: 16, nombre: "Pollo", recetaId: 4, fechaAgregado: "2024-02-02T16:50:00Z" },
    { id: 17, nombre: "Tortillas", recetaId: 4, fechaAgregado: "2024-02-02T16:50:00Z" },
    { id: 18, nombre: "Lechuga", recetaId: 4, fechaAgregado: "2024-02-02T16:50:00Z" },
    { id: 19, nombre: "Tomate", recetaId: 4, fechaAgregado: "2024-02-02T16:50:00Z" },
    { id: 20, nombre: "Cebolla", recetaId: 4, fechaAgregado: "2024-02-02T16:50:00Z" },
    { id: 21, nombre: "Cilantro", recetaId: 4, fechaAgregado: "2024-02-02T16:50:00Z" }
];

async function inicializarDatos() {
    try {
        console.log("Iniciando inserción de datos de prueba...");
        
        // Limpiar colecciones existentes
        await obtenerBD().collection("usuarios").deleteMany({});
        await obtenerBD().collection("recetas").deleteMany({});
        await obtenerBD().collection("ingredientes").deleteMany({});
        
        console.log("Colecciones limpiadas.");
        
        // Insertar usuarios
        await obtenerBD().collection("usuarios").insertMany(usuariosPrueba);
        console.log(`${usuariosPrueba.length} usuarios insertados.`);
        
        // Insertar recetas
        await obtenerBD().collection("recetas").insertMany(recetasPrueba);
        console.log(`${recetasPrueba.length} recetas insertadas.`);
        
        // Insertar ingredientes
        await obtenerBD().collection("ingredientes").insertMany(ingredientesPrueba);
        console.log(`${ingredientesPrueba.length} ingredientes insertados.`);
        
        console.log("✅ Datos de prueba inicializados exitosamente!");
        console.log("\n📊 Resumen de datos insertados:");
        console.log(`👥 Usuarios: ${usuariosPrueba.length}`);
        console.log(`🍳 Recetas: ${recetasPrueba.length}`);
        console.log(`🥕 Ingredientes: ${ingredientesPrueba.length}`);
        
        console.log("\n🔍 Ejemplos de búsquedas que puedes probar:");
        console.log("- Buscar recetas con 'pollo': GET /ingredientes/buscar?nombre=pollo");
        console.log("- Ver recetas de usuario 1: GET /recetas/usuario/1");
        console.log("- Ver ingredientes de receta 1: GET /ingredientes/receta/1");
        
    } catch (error) {
        console.error("❌ Error al inicializar datos:", error);
    }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    conectarBD().then(() => {
        inicializarDatos().then(() => {
            process.exit(0);
        });
    });
}

export { inicializarDatos };


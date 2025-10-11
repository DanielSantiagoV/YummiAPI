// ===== IMPORTS =====

// Importación de Express para crear el servidor web
import express from "express";
// Importación de dotenv para cargar variables de entorno
import 'dotenv/config'
// Importación de la función para conectar a la base de datos
import { conectarBD } from "./config/db.js";
// Importación de los routers modulares para cada entidad
import routerUsuarios from "./routers/usuarios.routes.js";
import routerRecetas from "./routers/recetas.routes.js";
import routerIngredientes from "./routers/ingredientes.routes.js";

// ===== CONFIGURACIÓN DEL SERVIDOR =====

/**
 * SERVIDOR PRINCIPAL DE YUMMIAPI
 * 
 * Este archivo configura y ejecuta el servidor Express que maneja
 * todas las peticiones HTTP de la API de recetas culinarias.
 */

// Creación de la instancia de Express
const app = express();

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// ===== CONFIGURACIÓN DE RUTAS =====

/**
 * CONFIGURACIÓN DE ROUTERS MODULARES
 * 
 * Cada router maneja las rutas específicas de su entidad:
 * - /usuarios - Gestión de usuarios
 * - /recetas - Gestión de recetas
 * - /ingredientes - Gestión de ingredientes
 */

// Router para gestión de usuarios
app.use("/usuarios", routerUsuarios);

// Router para gestión de recetas
app.use("/recetas", routerRecetas);

// Router para gestión de ingredientes
app.use("/ingredientes", routerIngredientes);

// ===== RUTAS ESPECIALES =====

/**
 * Ruta de salud (health check)
 * Permite verificar que el servidor está funcionando correctamente
 * @route GET /health
 * @returns {Object} Mensaje de confirmación de que la API está activa
 */
app.get("/health", (req, res)=>{
    res.status(200).json({message: "API de Recetas Culinarias activa!!! 🍳"});
})

// ===== INICIALIZACIÓN DEL SERVIDOR =====

/**
 * INICIALIZACIÓN Y EJECUCIÓN DEL SERVIDOR
 * 
 * 1. Conecta a la base de datos MongoDB
 * 2. Inicia el servidor Express en el puerto especificado
 * 3. Muestra mensaje de confirmación en consola
 */
conectarBD().then(()=>{
    // Inicia el servidor en el puerto especificado en las variables de entorno
    app.listen(process.env.PORT, ()=>{
        console.log(`Backend escuchando en http://${process.env.HOST_NAME}:${process.env.PORT}`)
    })
})
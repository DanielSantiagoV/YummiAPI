// Importación de dependencias necesarias para la conexión a MongoDB
import { MongoClient } from "mongodb";
import 'dotenv/config'

// Configuración de variables de entorno para la conexión a la base de datos
const uri = process.env.MONGO_URI;        // URI de conexión a MongoDB
const db_name = process.env.DB_NAME;      // Nombre de la base de datos

// Creación del cliente de MongoDB
const cliente = new MongoClient(uri);
// Variable para almacenar la referencia a la base de datos
let db;

/**
 * Función para establecer la conexión con la base de datos MongoDB
 * Se conecta al servidor MongoDB y selecciona la base de datos especificada
 */
export async function conectarBD(){
    try {
        // Establece la conexión con el servidor MongoDB
        await cliente.connect();
        console.log("DB conectada!!!");
        // Selecciona la base de datos específica
        db = cliente.db(db_name);
    } catch (error) {
        console.error("Error al conectar la BD:", error)
    }
}

/**
 * Función para obtener la referencia a la base de datos
 * Verifica que la conexión esté establecida antes de retornar la referencia
 * @returns {Object} Referencia a la base de datos MongoDB
 * @throws {Error} Si la base de datos no está conectada
 */
export function obtenerBD(){
    if(!db) throw new Error("No se ha conectado la BD!!");
    return db;
}
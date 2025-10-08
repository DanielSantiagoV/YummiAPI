//imports
import express from "express";
import 'dotenv/config'
import { conectarBD } from "./config/db.js";
import routerUsuarios from "./routers/usuarios.routes.js";
import routerRecetas from "./routers/recetas.routes.js";
import routerIngredientes from "./routers/ingredientes.routes.js";


//Config
const app = express();
app.use(express.json());

//Routers
app.use("/usuarios", routerUsuarios);
app.use("/recetas", routerRecetas);
app.use("/ingredientes", routerIngredientes);


app.get("/health", (req, res)=>{
    res.status(200).json({message: "API de Recetas Culinarias activa!!! 🍳"});
})


// Excecution
conectarBD().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Backend escuchando en http://${process.env.HOST_NAME}:${process.env.PORT}`)
    })
})
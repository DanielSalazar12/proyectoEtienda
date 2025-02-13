const express = require('express');
const app = express();
const cors = require('cors');

// Middlewars de app

app.use(cors());
app.use(express.json());

// Llamamos la libreria de conexion
const conexion = require('./models/bd_conexion.js');

conexion();

//Rutas globales de la app

const productoRuta= require("./routes/productos.js");
const usuarioRuta= require("./routes/usuarios.js");

//Usamos las rutas 

app.use("/api",productoRuta);

app.use("/api",usuarioRuta);

app.listen(4000,()=>{
    console.log(`listen ${4000}`);
});


// Rutas para consumir el modulo productos del servicio Ecommerce

const express =require("express");
const router =express.Router();


//Instanciamos el controlador correspondiente 
const usuarioController=require("../controllers/usuarios");

//rutas que entrega la API 

router.get("/usuario/listartodos",usuarioController.listarTodos);

//....

module.exports = router; 
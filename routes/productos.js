// Rutas para consumir el modulo productos del servicio Ecommerce

const express =require("express");
const router =express.Router();


//Instanciamos el controlador correspondiente 
const productoController=require("../controllers/productos");

//rutas que entrega la API 

router.get("/producto/listartodos",productoController.listarTodos);
//....

module.exports = router; 
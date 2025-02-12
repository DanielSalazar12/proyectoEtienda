//Controlador para el manejo de los producto 

//Conectamos el controlador con su modelo correspondiente

const { model } = require('mongoose');

let producto=require ('../models/productos');

//Toda la logica de un crud comun y corriente

const listarTodos = async (req,res)=>{

    try {
        //Consultar todos sin filtro

        let listarProductos= await producto.find().exec();
        res.status(200).send({
            exito:true,
            listarProductos,
        })
        
    } catch (error) {
        res.status(500).send({
            exito:false,
            mensaje:"Error en la consulta",
        });
    }
    
};
module.exports={listarTodos};

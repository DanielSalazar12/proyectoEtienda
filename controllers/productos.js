//Controlador para el manejo de los producto 

//Conectamos el controlador con su modelo correspondiente

//const { model } = require('mongoose');

let producto=require ('../models/productos');
//const req = require('express/lib/request');
//const res = require('express/lib/response');

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

//Crear nuevo 
const nuevo =async (req,res) =>{
//Llega el objeto en el body del request 

let datos ={
   nombre: req.body.nombre,
   descripcion:req.body.descripcion,
   imagen: req.body.imagen,
   marca:req.body.marca,
   precio:req.body.precio,
   existencia:req.body.existencia,
   rating:req.body.rating,
   numRevisiones:req.body.numRevisiones,
   estaOfertado:req.body.estaOfertado,
};

try {
    // Instanciamos del modelo producto (Collection)
const productoNuevo =new producto(datos);

// Salvamos mongoose

productoNuevo.save(); //Escribe el mongo

return res.send({
    estado:true,
    mensaje:`Insercion exitosa`,
});

} catch (error) {
    return res.send({
        estado:false,
        mensaje:`A ocurrido un error en la consulta ${error}`,
    });
}
};

module.exports={listarTodos,nuevo};

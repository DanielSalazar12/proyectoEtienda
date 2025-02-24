//Controlador para el manejo de los producto 

//Conectamos el controlador con su modelo correspondiente

//const { model } = require('mongoose');
//const Prodducto=require('../models/productos')
let producto=require ('../models/productos');
//const req = require('express/lib/request');
//const res = require('express/lib/response');

//Toda la logica de un crud comun y corriente
/**
@description funcion que hace login o ingreso al sistema con autenticación de 2 factores 
@author juandaniels
@param req la petición del usuario y la pass
@param res falso si no existe el usuario, true y mensaje de exito si se crea, false y mensaje de error si no ingreso
@version 01 -24-02-2025
@callback function asincronica que ejecuta la api
 */

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


//Buscar por parametro 

const buscarPorId = async (req,res)=>{
//Recibimos el parametro por el cual debo buscar y eliminar 

let id=req.params.id;

/*if(req.params.id)
{
    
}else
{
    console.log("Le falta el parametro");
}*/

try {
    //Logica de buscar  mostrar el resultado    
  //let consulta = await producto.find(id).exec();
  let consulta = await producto.findById(id).exec();

  return res.send({
    estado:true,
    mensaje:`Busqueda exitosa`,
    consulta:consulta,
});

} catch (error) {
    return res.send({
        estado:false,
        mensaje:`Error, no se pudo realizar la consulta`,
    });
}
}

//Actualizar de acuerdo al producto al id del producto 

const actualizarPorId = async (req,res)=>{
    //Recibe el parametro de la consulta

      let id = req.params.id;

      

    //Payload que viene en el body :: los datos que manda el formulario

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
        let consulta = await producto.findByIdAndUpdate(id,datos).exec();
        return res.send({
            estado:true,
            mensaje:`Actualizacion exitosa`,
            consulta:consulta,
        });
     } catch (error) {
        return res.send({
            estado:true,
            mensaje:`Error al actualizar`,
            consulta:consulta,
        });
     }
}



//Borrar de acuerdo al id :: Recuerde que este 

const borrarPorId = async (req,res)=>
{
    
let id=req.params.id;

try {
   
   // let consulta = await producto.findByIdAndDelete(id).exec();
   let consulta = await producto.findOneAndDelete({_id: id}).exec();

    return res.send({
    estado:true,
    mensaje:`Se eliminó correctamente`,
    consulta:consulta,
});

} catch (error) {
    return res.send({
        estado:false,
        mensaje:`Error, no se elimino`,
    });
}
};



module.exports={listarTodos,nuevo,buscarPorId,borrarPorId,actualizarPorId};



const usuarios = require('../models/usuarios');
let Usuarios=require ('../models/usuarios');
let jwt =require('jsonwebtoken');

let bcrytp =require('bcryptjs')

//Funciones de la libreria 

const listarTodos = async (req,res)=>{

    try {
        //Consultar todos sin filtro

        let listarUsuarios= await Usuarios.find().exec();
        res.status(200).send({
            exito:true,
            listarUsuarios,
        })
        
    } catch (error) {
        res.status(500).send({
            exito:false,
            mensaje:"Error en la consulta",
        });
    }
    
};

/**  
@abstract funcion que hace la insercion se los usuarios en el sistema 
@author juandaniels
@param req la petición con la data del formulario de registro del usuario 
@param res falso si no existe el usuario, true y mensaje de exito si se crea, false y mensaje de error si no ingreso
@version 01 -24-02-2025
@callback function asincronica que ejecuta la api

*/

//Crear nuevo 
const nuevo =async (req,res) =>{
//Llega el objeto en el body del request 

let datos ={
   nombre: req.body.nombre,
   email:req.body.email,
   passwordHash: bcrytp.hashSync(req.body.passwordHash,10),
   telefono:req.body.telefono,
   esAdmin:req.body.esAdmin,
   direccion:req.body.direccion,
   zip:req.body.zip,
   ciudad:req.body.ciudad,
   pais:req.body.pais,
};

try {
    // Instanciamos del modelo producto (Collection)
const usuarioNuevo =new usuarios(datos);

// Salvamos mongoose

usuarioNuevo.save(); //Escribe el mongo

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
  let consulta = await usuarios.findById(id).exec();

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

/**  
@description funcion que hace login o ingreso al sistema con autenticación de 2 factores 
@author juandaniels
@param req la petición del usuario y la pass
@param res falso si no existe el usuario, true y mensaje de exito si se crea, false y mensaje de error si no ingreso
@version 01 -24-02-2025
@callback function asincronica que ejecuta la api

*/

const login = async function(req, res){
let usuarioexiste = await Usuarios.findOne({ email: req.body.email });
    
if (!usuarioexiste) {
return res.send({
estado: false,
mensaje: "Usuario no existe en el sistema",
 });
}
    
if (bcrytp.compareSync(req.body.passwordHash, usuarioexiste.passwordHash)) {

const token =jwt.sign(
    {
    userId: usuarioexiste.id,
    esAdmin: usuarioexiste.esAdmin,
   },

"seCreTo",

{expiresIn:"4h"}
);

return res.send({
estado: true,
mensaje: "Ingreso exitoso al sistema",
token:token
 });
} else {
return res.send({
estado: false,
mensaje: "Credenciales erroneas,intentalo de nuevo",
 });
}
};

////=====================


module.exports={listarTodos,buscarPorId,nuevo,login};
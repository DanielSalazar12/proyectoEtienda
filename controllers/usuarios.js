

const usuarios = require('../models/usuarios');
let Usuarios=require ('../models/usuarios');

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


    const login = async (req, res) => {
    let usuarioexiste = await Usuarios.findOne({ email: req.body.email });
    
    if (!usuarioexiste) {
    return res.send({
    estado: false,
    mensaje: "no existe el usuario",
    });
    }
    
    if (bcrypt.compareSync(req.body.clave, Usuarios.passwordHash)) {
    return res.send({
    estado: true,
    mensaje: "ok",
    });
    } else {
    return res.send({
    estado: false,
    mensaje: "no",
    });
    }
    };

////=====================


module.exports={listarTodos,buscarPorId,nuevo};
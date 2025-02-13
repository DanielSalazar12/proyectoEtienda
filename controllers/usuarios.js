

let Usuarios=require ('../models/usuarios');



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

module.exports={listarTodos};
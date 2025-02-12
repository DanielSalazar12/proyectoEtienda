
//Instanciamos la libreria

const mongoose = require("mongoose");

const conexion = async ()=>{

    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/DBtienda');
      console.log(`Conectado`);
    } catch (error) {
        console.log(`Error en la funcion : ${error}`);
      //  throw new Error(error);
    }
}
module.exports=conexion;


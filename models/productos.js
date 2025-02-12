//Modelo para ña coleccion producto 

//Destructuring de la clase mongoose -- Solo tre lo que necesito 

const {Schema,model, Collection}=  require ("mongoose");

//Creamos el Squema(Es la estructura) 

const productoSchema = Schema({
    
    //nombre:String,
    
    nombre:{
        type:String,
        required:true,
    },
    //precio:Number,
    precio:{type:Number,required:false},

    existencia:{
        type:Number,
        required:true,
    }
},

{ collection: "producto"}

);

module.exports=model("Producto",productoSchema);
//Modelo para ña coleccion producto 

//Destructuring de la clase mongoose -- Solo tre lo que necesito 

const {Schema,model, Collection}=  require ("mongoose");

//Creamos el Squema(Es la estructura) 

const productoSchema = Schema({
    
    //nombre:String,
    
    nombre: {
        type: String,
        required: true,
      },
      descripcion: {
        type: String,
        default: "",
      },
      imagen: {
        type: String,
        default: "",
      },
      imagenes: [
        {
          type: String,
        },
      ],
      marca: {
        type: String,
        default: "",
      },
      precio: {
        type: Number,
        default: 0,
      },
      /* categoria: {
  type:
  mongoose.Schema.Types.ObjectId
  ,
  ref: &quot;Category&quot;,
  required: true,
  }, */
      existencia: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
      rating: {
        type: Number,
        default: 0,
      },
      numRevisiones: {
        type: Number,
        default: 0,
      },
      estaOfertado: {
        type: Boolean,
        default: false,
      },
      fechaCreacion: {
        type: Date,
        default: Date.now,
      },
},

{ collection: "producto"}

);

module.exports=model("productos",productoSchema);
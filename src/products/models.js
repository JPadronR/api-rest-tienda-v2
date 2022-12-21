const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/*
const urlMongoDB = "mongodb+srv://admin:pass1@api-res.huwmnb2.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(urlMongoDB,(err, res) => {
    try {
        if(err)
        {
            throw err;
        } else
        {
            console.log("CONEXION EXITOSA");
        }

    } catch (error){
        console.log(error);
    }
})*/


const productSchema = Schema({
    nombre:{
        type: String,
        require: true
    },
    precio:{
        type: String,
        require: true
    },
    existencia:{
        type: String,
        require: true
    },
    vendidos:{
        type: String,
        require: true,
        default: "0"
    },
    tipo:{
        type: String,
        require: true
    },/*
    clave:{
        type: String,
        require: true
    },*/
    clave_provedor:{
        type: String,
        require: true
    },
    ubicacion:{
        type: String,
        require: true
    },
    descripcion:{
        type: String,
        require: true
    },
    tipo_exis:{
        type:String,
        require: true,
        default: "alta"
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Producto', productSchema);
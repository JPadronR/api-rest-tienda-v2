const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = Schema({
    nombre:{
        type: String,
        require: true
    },
    usuario:{
        type: String,
        require: true
    },
    pass:{
        type: String,
        require: true
    },
    correo:{
        type: String,
        require: true,
        lowercase: true
    },
    rol:{
        type: String,
        require: true,
        lowercase: true
    },
    inicio:{
        type: String,
        require: false,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Usuario', userSchema);
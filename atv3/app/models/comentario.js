const mongoose = require("mongoose");

module.exports = function(){
    let schema = mongoose.Schema({
        texto:{
            type: "String"
        },
        usuario:{
            type: mongoose.Schema.ObjectId,
            ref: "Usuario"
        },
        post:{
            type: mongoose.Schema.ObjectId,
            ref: "Post"
        }
    });
    return mongoose.model("Comentario", schema);
}()
const Comentario = require("../models/comentario");
const viewComentario = require("../views/comentarios");

module.exports.inserirComentario = function(req, res){
    let comentario = req.body;
    let promise = Comentario.create(comentario);
    promise.then(function(comentario){
        res.status(201).json(viewComentario.render(comentario));
    }).catch(function(error){
        res.status(500).json({mensagem: "ERROR!"})
    })
}

module.exports.listarComentarios = function(req, res){
    let promise = Comentario.find()
                            .populate("usuario")
                            .populate("post").exec();
    promise.then(function(comentario){
        res.status(200).json(viewComentario.renderMany(comentario));
    }).catch(function(error){
        res.status(500).json({mensagem: "ERROR!"})
    })
}

module.exports.removerComentario = function(req, res){
    let id = req.params.id
    let promise = Comentario.findByIdAndDelete(id);
    promise.then(function(comentario){
        res.status(200).json(viewComentario.render(comentario));
    }).catch(function(error){
        res.status(500).json(error)
    })
}
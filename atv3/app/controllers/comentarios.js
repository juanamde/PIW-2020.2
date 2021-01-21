const Comentario = require("../models/comentario");
const viewComentario = require("../views/comentario");
const jwt = require("jsonwebtoken")

module.exports.inserirComentario = function(req, res){
    let comentario = req.body;

    let promise = Comentario.create(comentario);
    promise.then(function(comentario){
        res.status(201).json(viewComentario.render(comentario));
    }).catch(function(error){
        res.status(500).json({mensagem: "Requisição não concluida", error: error});
    });
};

module.exports.listarComentarios = function(req, res){
    let promise = Comentario.find()
                            .populate("usuario")
                            .populate("post").exec();
    promise.then(function(comentario){
        res.status(200).json(viewComentario.renderMany(comentario));
    }).catch(function(error){
        res.status(500).json({mensagem: "Requisição não concluida", error: error})
        console.log(error)
    });
};

module.exports.removerComentario = function(req, res){
    let id = req.params.id;

    let token = req.headers.token;
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;

    let promise = Comentario.findOneAndDelete({_id: id, usuario: id_usuario_logado});

    promise.then(function(comentario){
        res.status(200).json(viewComentario.render(comentario));
    }).catch(function(error){
        res.status(400).json({mensagem: "As credenciais não coincidem"})
        console.log(error)
    });
}

/*module.exports.removerComentario = function(req, res){
    let id = req.params.id;

    let promise = Comentario.findByIdAndDelete(id);
    promise.then(function(comentario){
        res.status(200).json(viewComentario.render(comentario));
    }).catch(function(error){
        res.status(500).json({mensagem: "Requisição não concluida", error: error})
    });
};*/
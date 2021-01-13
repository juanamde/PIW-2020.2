const Post = require("../models/post")
const Comentario = require("../models/comentario")
const viewPost = require("../views/posts")
const viewComentario = require("../views/comentarios")

module.exports.inserirPost = function(req, res){
    let post = req.body;
    let promise = Post.create(post);
    promise.then(function(post){
        res.status(201).json(viewPost.render(post));
    }).catch(function(error){
        res.status(500).json({mensagem: "Requisição não concluída"});
    })
}
module.exports.listarPosts = function(req, res){
    let promise = Post.find().exec();
    promise.then(function(post){
        res.status(200).json(viewPost.renderMany(post));
    }).catch(function(error){
        res.status(500).json({mensagem: "Requisição não concluida"})
    })
}
module.exports.buscarPostPorId = function(req, res){
    let id = req.params.id;
    let promisse = Post.findById(id).exec();
    promisse.then(function(post){
        res.status(200).json(viewPost.render(post));
    }).catch(function(error){
        res.status(404).json({mensagem: "ERROR!", error:error})
    })
}

module.exports.obterComentario = function(req, res){
    let id = req.params.id;
    let promise = Comentario.find({post:id});
    promise.then(function(comentario){
        res.status(200).json(viewComentario.renderMany(comentario));
    }).catch(function(error){
        res.status(500).json({mensagem: "ERROR!"})
    })
}

module.exports.removerPost = function(req, res){
    let id = req.params.id
    let promise = Post.findByIdAndDelete(id);
    promise.then(function(post){
        res.status(200).json(viewUsuario.render(post));
    }).catch(function(error){
        res.status(500).json(error)
    })
}


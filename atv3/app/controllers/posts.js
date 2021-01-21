const Post = require("../models/post");
const Comentario = require("../models/comentario");
const viewPost = require("../views/post");
const viewComentario = require("../views/comentario");
const jwt = require("jsonwebtoken");

module.exports.inserirPost = function(req, res){
    let post = req.body;

    let promise = Post.create(post);
    promise.then(function(post){
        res.status(201).json(viewPost.render(post));
    }).catch(function(error){
        res.status(500).json({mensagem: "Requisição não concluida", error: error});
    });
};

module.exports.listarPosts = function(req, res){
    let promise = Post.find().exec();
    promise.then(function(post){
        res.status(200).json(viewPost.renderMany(post));
    }).catch(function(error){
        res.status(500).json({mensagem: "Requisição não concluida", error: error})
    });
};

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
        res.status(500).json({mensagem: "Requisição não concluida", error: error})
    });
};

module.exports.removerPost = function(req, res){
    let id_post = req.params.id;

    let token = req.headers.token;
    let payload = jwt.decode(token)
    let id_usuario_logado = payload.id;

    console.log(id_post);
    console.log(token);
    console.log(payload);
    console.log(id_usuario_logado)


    let promise = Post.findOneAndDelete({_id: id_post, usuario: id_usuario_logado});

    promise.then(function(post){
        res.status(200).json(viewPost.render(post));
    }).catch(function(error){
        res.status(400).json({mensagem: "As credenciais não coincidem"})
    });
};

/*module.exports.removerPost = function(req, res){
    let id = req.params.id;

    let promise = Post.findByIdAndDelete(id);
    promise.then(function(post){
        res.status(200).json((viewPost.render(post)));
    }).catch(function(error){
        res.status(500).json({mensagem: "Requisição não concluida", error: error})
        console.log(error)
    });
};*/
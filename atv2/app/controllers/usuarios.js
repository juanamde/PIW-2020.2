const Usuario = require("../models/usuario")
const Post = require("../models/post")
const viewUsuario = require("../views/usuarios")
const viewPost = require("../views/posts")



module.exports.listarUsuarios = function(req, res){
    let promisse = Usuario.find().exec();
    promisse.then(function(usuario){
        res.status(200).json(viewUsuario.renderMany(usuario))
    }).catch(function(error){
        res.status(500).json({mensagem: "Problemas no banco!"})
    })
}
module.exports.buscarUsuarioPorId = function(req, res){
    let id = req.params.id;
    let promisse = Usuario.findById(id).exec();
    promisse.then(function(usuario){
        res.status(200).json(viewUsuario.render(usuario));
    }).catch(function(error){
        res.status(404).json({mensagem: "ERROR!", error:error})
    })
}
module.exports.inserirUsuario = function(req, res){
    let usuario = req.body;
    //Função chamada quando a requisição ao banco foi concluida
    //Recebe o usuario inserido como parametro
    let promisse = Usuario.create(usuario);
    promisse.then(function(usuario){
        res.status(201).json(viewUsuario.render(usuario))
    }).catch(function(error){
        res.status(400).json({mensagem: "ERROR"})
    })
}

module.exports.removerUsuario = function(req, res){
    let id = req.params.id
    let promise = Usuario.findByIdAndDelete(id);
    promise.then(function(usuario){
        res.status(200).json(viewUsuario.render(usuario));
    }).catch(function(error){
        res.status(500).json(error)
    })
}

module.exports.obterPost = function(req, res){
    let id = req.params.id;
    let promise = Post.find({usuario:id}).exec();
    promise.then(function(post){
        res.status(200).json(viewPost.renderMany(post));
    }).catch(function(error){
        res.status(500).json({mensagem: "ERROR!"})
    }) 
}


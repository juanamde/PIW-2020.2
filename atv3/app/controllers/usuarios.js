const Usuario = require("../models/usuario");
const Post = require("../models/post");
const viewUsuario = require("../views/usuario");
const viewPost = require("../views/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.inserirUsuario = function(req, res){
    let usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10)
    };

    let promise = Usuario.create(usuario);
    promise.then(function(usuario){
        res.status(201).json(viewUsuario.render(usuario));
    }).catch(function(error){
        res.status(400).json({mensagem: "ERROR"})
    });
};

/*module.exports.inserirUsuario = function(req, res){
    let usuario = req.body;

    let promise = Usuario.create(usuario);
    promise.then(function(usuario){
        res.status(201).json(viewUsuario.render(usuario));
    }).catch(function(error){
        res.status(400).json({menagem: "Requisição não concluida", error: error})
    })
}*/

module.exports.listarUsuarios = function(req, res){
    let promise = Usuario.find().exec();
    promise.then(function(usuario){
        res.status(200).json(viewUsuario.renderMany(usuario));
    }).catch(function(erro){
        res.status(500).json({mensagem: "Requisição não concluida", error: error})
    });
};

module.exports.buscarUsuarioPorId = function(req, res){
    let id = req.params.id;

    let promise = Usuario.findById(id).exec();
    promise.then(function(usuario){
        res.status(200).json(viewUsuario.render(usuario));
    }).catch(function(error){
        res.status(404).json({mensagem: "Requisição não concluida"})
    });
};

module.exports.obterPost = function(req, res){
    let id = req.params.id;

    let promise = Post.find({usuario:id}).exec();
    promise.then(function(post){
        res.status(200).json(viewPost.renderMany(post));
    }).catch(function(error){
        res.status(500).json({mensagem: "Requisição não concluida"})
    });
};

module.exports.removerUsuario = function(req, res){
    let token = req.headers.token;
    let payload =jwt.decode(token);
    let id_usuario_logado = payload.id;
    let id = req.params.id;
    
    let promise = Usuario.findByIdAndDelete(id);
    promise.then(function(usuario){
        if(id != id_usuario_logado){
            res.status(401).json({mensagem: "As credenciais não coincidem"})
        }else{
            res.status(200).json(viewUsuario.render(usuario));
        }
    }).catch(function(error){
        res.status(500).json(error)
    });
};

/*module.exports.removerUsuario = function(req, res){
    let id = req.params.id;

    let promise = Usuario.findByIdAndDelete(id);
    promise.then(function(usuario){
        res.status(200).json(viewUsuario.render(usuario));
    }).catch(function(error){
        res.status(500).json({mensagem: "Requisição não concluida", error: error})
    });
};*/




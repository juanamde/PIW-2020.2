const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.logar = function(req, res){
    Usuario.findOne(
        {email: req.body.email})
        .then(function(usuario){
            if(bcrypt.compareSync(req.body.senha, usuario.senha)){
                let token = jwt.sign({id: usuario._id}, "senha-secreta");
                res.status(200).json({token});
            }else{
                res.status(401).send("As credenciais não coincidem")
            }
        })
        .catch(function(error){
            res.status(401).send("As credenciais não coincidem")
        });
};

module.exports.checar = function(req, res, next){
    let token = req.headers.token;
    jwt.verify(token, "senha-secreta", function(err, decoded){
        if(err){
            res.status(401).send("Token inválido!");
        }else{
            next();
        }
    });
};
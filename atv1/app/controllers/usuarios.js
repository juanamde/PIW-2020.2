let usuarios = [
    {"id": "5", "nome": "João", "email": "joao@gmail.com", "senha": "456"}
]



module.exports.listarUsuarios = function(req, res){
    console.log(req.query)
    res.json(usuarios)
}
module.exports.buscarUsuarioPorId = function(req, res){
    let id = req.params.id
    let usuario = usuarios.find(function(usuario){return usuario.id==id})

    if(usuario){
        res.json(usuario);
    }else{
        res.json({"ERROR": "Usuário não encontrado"}).staus(404)
    }
}
module.exports.inserirUsuario = function(req, res){
    let usuario = req.body;
    usuarios.push(usuario)
    res.status(201).json(usuario)
}

module.exports.removerUsuario = function(req, res){
    let id = req.params.id
    usuarios = usuarios.filter(function(usuario){return usuario.id!=id});
    res.json({mensagem: "usuário removido"})
}
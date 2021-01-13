let posts = [
    {"id": "5", "texto": "Tudo bom! E vc?", "likes": "6"}
]



module.exports.listarPosts = function(req, res){
    console.log(req.query)
    res.json(posts)
}
module.exports.buscarPostPorId = function(req, res){
    let id = req.params.id
    let post = posts.find(function(post){return post.id==id})

    if(post){
        res.json(post);
    }else{
        res.json({"ERROR": "Post não encontrado"}).staus(404)
    }
}
module.exports.inserirPost = function(req, res){
    let post = req.body;
    posts.push(post)
    res.status(201).json(post)
}

module.exports.removerPost = function(req, res){
    let id = req.params.id
    posts = posts.filter(function(post){return post.id!=id});
    res.json({mensagem: "Post removido"})
}
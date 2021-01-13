const viewUsuario = require("../views/usuarios")
const viewPost = require("../views/posts")

function render(comentario){
    return{
        id: comentario._id,
        texto: comentario.texto,
        usuario: viewUsuario.render(comentario.usuario),
        post: viewPost.render(comentario.post)
    }
}
module.exports.render = render;

function renderMany(comentario){
    return comentario.map(render);
}
module.exports.renderMany = renderMany;
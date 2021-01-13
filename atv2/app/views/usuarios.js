function render(usuario){
    return{
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
    }
}
module.exports.render = render;

function renderMany(usuario){
    return usuario.map(render);
}
module.exports.renderMany = renderMany;

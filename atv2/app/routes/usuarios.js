const controller = require("../controllers/usuarios")
module.exports = function(app){
    //get
    app.post("/api/usuarios", controller.inserirUsuario);
    app.get("/api/usuarios", controller.listarUsuarios);
    app.get("/api/usuarios/:id", controller.buscarUsuarioPorId);
    app.get("/api/usuarios/:id/posts", controller.obterPost);
    app.delete("/api/usuarios/:id", controller.removerUsuario);  
}  
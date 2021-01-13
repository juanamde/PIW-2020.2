const controller = require("../controllers/posts")
module.exports = function(app){
    //get
    app.get("/api/posts", controller.listarPosts);
    app.get("/api/posts/:id", controller.buscarPostPorId)
    app.post("/api/posts", controller.inserirPost)
    app.delete("/api/posts/:id", controller.removerPost)


}  
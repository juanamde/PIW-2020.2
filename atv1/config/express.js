const bodyParser = require('body-parser');
const express = require('express');
const routerUsuarios = require("../app/routes/usuarios");
const routerPosts = require("../app/routes/posts");
module.exports = function(){
    let app = express();

    app.set("port", 8393);
    
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());

    app.use(express.static('./public'));
    routerUsuarios(app);
    routerPosts(app);
   return app;
};
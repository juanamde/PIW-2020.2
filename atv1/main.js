const http = require("http"); //biblioteca do node que faz um servidor rodar na minha máquina
const app = require('./config/express')();


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server escutando na porta '+app.get('port'));
}); //criando servidor


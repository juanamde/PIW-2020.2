const http = require("http"); //biblioteca do node que faz um servidor rodar na minha máquina
const app = require('./config/express')();
const db = require('./config/database')

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server escutando na porta '+app.get('port'));
}); //criando servidor

db('mongodb://localhost/sistemapostagem')
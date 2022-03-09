var express = require('express');
const app = express();
var helper = require('../helper/helperNoticias');

app.get('/', function(req, res) {
  helper.getNoticias(function(noticias) {
    res.render('inicio', {noticias: noticias });
  }
)});

app.get('/eliminar', function(req, res) {
  helper.deleteNoticias(req.query.id,function(respuesta) {
    if(respuesta == true){
      res.sendStatus(200);
    }else{
      res.sendStatus(400);
    }
  });
});

module.exports = app;

const http = require('http'),
  express = require('express'),
  port = process.env.PORT || 3000,
  autenticador = express.Router(),
  hbs = require('hbs'),
  helper = require('./helper/helperNoticias');

  const app = express();
  app.use(express.static(__dirname + '/public'));
  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);
  app.disable('x-powered-by');

  app.use(require('./routes/inicio'));
  hbs.registerPartials(__dirname + '/views');
  app.listen(port);

  helper.batchNoticias();

  module.exports = app;

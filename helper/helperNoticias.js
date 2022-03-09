const urlNoticias = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
const mongo = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://127.0.0.1:27017';
const axios = require('axios');
const ObjectId = require('mongodb').ObjectID;

var batchNoticias = function() {
  cron = require('node-schedule');
  cron.scheduleJob('0 */1 * * *', function(){
    ////////// A C T U A L I Z A R   /////////
    axios.get(urlNoticias)
    .then(json => {return json.data.hits})
    .then(noticias => {
      mongo.connect(mongoUrl, function(err, conexion) {
        if (err) return err;
        db = conexion.db('hacknews');
        noticias.forEach(function(noticia) {
          db.collection('noticias').updateMany(noticia, {'$set': {"flag": false}}, { upsert: true, many: true });
        })
      });
    })
    .catch(function (error) {
      console.log("Ocurrio un Problema");
    });
  });
};

var getNoticias = function(response) {
    mongo.connect(mongoUrl, function(err, conexion) {
        db = conexion.db('hacknews');
        db.collection('noticias').find({"flag": false}).toArray((err, noticia) => {
            if (err) throw err;
            response(noticia)
        });
    });
};

var deleteNoticias = function(id,response) {
  mongo.connect(mongoUrl, function(err, conexion) {
      db = conexion.db('hacknews');
      db.collection('noticias').updateOne({ _id: ObjectId(id) }, { $set: { flag : true } }, function(err, res) {
        if (err) {
           response(false);
        }else{
           response(true);
        }
      });
  });
};



module.exports = {
  batchNoticias: batchNoticias,
  getNoticias : getNoticias,
  deleteNoticias: deleteNoticias
}

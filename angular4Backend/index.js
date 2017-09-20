'use strict'
let mongoose = require('mongoose');
let app = require('./app');
let port =process.env.PORT || 3789;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo', { useMongoClient: true })
   .then(() => {
      console.log('La conexion a la db zoo es correcta');
      app.listen(port,()=>{
         console.log('El servidor local con NODE y EXPRESS correcto');
      });
   }).catch(err => console.log(err));
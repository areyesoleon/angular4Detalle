'use strict'
const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_del_curo_de_angular4avanzado';

exports.ensureAuth = (req,res,next)=>{
   if(!req.headers.authorization){
      return res.status(403).send({message:'la peticion no tiene el token'})
   }
   const token = req.headers.authorization.replace(/['"]+/g,'');
   try{
      var payload = jwt.decode(token,secret) ;
      if(payload.exp <= moment().unix()){
         return res.status(401).send({message: 'El token a expirado'});
      }
   }
   catch(ex){
      return res.status(404).send({message: 'El token no es valido'});
   }
   req.user = payload;
   next();
}
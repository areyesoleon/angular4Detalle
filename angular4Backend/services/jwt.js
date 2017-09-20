'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_del_curo_de_angular4avanzado';

exports.createToken = (user)=>{
   let payload = {
      sub: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      image: user.image,
      iat: moment().unix(),
      exp: moment().add(30,'days').unix
   };
   return jwt.encode(payload,secret);
};
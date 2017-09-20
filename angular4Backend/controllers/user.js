'use strict'
{/*Modulos*/ }
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

{/*Modelos*/ }
var User = require('../models/user');

{/*Servicios*/ }
var jwt = require('../services/jwt');

{/*Acciones*/ }
function pruebas(req, res) {
   res.status(200).send({
      message: 'Probando el controlador de usuariosy de acciones proebas',
      user: req.user
   });
}

function saveUser(req, res) {

   {/*Crear objeto usuario*/ }
   let user = new User();

   {/*Recoger parametros  peticion*/ }
   let params = req.body;

   {/*Asignar valores al usuario*/ }

   if (params.password && params.surname && params.email) {
      user.name = params.name;
      user.surname = params.surname;
      user.email = params.email;
      user.role = 'ROLE_USER';
      user.image = null;

      User.findOne({ email: user.email.toLowerCase() }, (err, issetUser) => {
         if (err) {
            res.status(500).send({ message: 'Error al comprobar usuario' });
         }
         else {
            if (!issetUser) {
               bcrypt.hash(params.password, null, null, (err, hash) => {
                  user.password = hash;
                  user.save((err, userStored) => {
                     if (err) {
                        res.status(500).send({ message: 'Error al guardar' });
                     }
                     else {
                        if (!userStored) {
                           res.status(404).send({ message: 'No se a registrado el usuario' });
                        }
                        else {
                           res.status(200).send({ user: userStored });
                        }
                     }
                  });
               });
            }
            else {
               res.status(404).send({ message: 'El usuario ya existe' });
            }
         }
      });

   }
   else {
      res.status(200).send({
         message: 'Ingrese los datos correctamente'
      });
   }
}

function login(req, res) {
   let params = req.body;
   let email = params.email;
   let password = params.password;

   User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
         res.status(500).send({ message: 'Error al guardar' });
      }
      else {
         if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
               if (check) {
                  if (params.gettoken) {
                     res.status(200).send({
                        token: jwt.createToken(user)
                     });
                  }
                  else {
                     res.status(200).send({ user })
                  }
               }
               else {
                  res.status(404).send({
                     message: 'Usuario no a podido logearse correctamente'
                  });
               }
            });
         }
         else {
            res.status(404).send({
               message: 'Usuario no a podido logearse'
            });
         }
      }
   })
}

function saveUser(req, res) {

   {/*Crear objeto usuario*/ }
   let user = new User();

   {/*Recoger parametros  peticion*/ }
   let params = req.body;

   {/*Asignar valores al usuario*/ }

   if (params.password && params.surname && params.email) {
      user.name = params.name;
      user.surname = params.surname;
      user.email = params.email;
      user.role = 'ROLE_USER';
      user.image = null;

      User.findOne({ email: user.email.toLowerCase() }, (err, issetUser) => {
         if (err) {
            res.status(500).send({ message: 'Error al comprobar usuario' });
         }
         else {
            if (!issetUser) {
               bcrypt.hash(params.password, null, null, (err, hash) => {
                  user.password = hash;
                  user.save((err, userStored) => {
                     if (err) {
                        res.status(500).send({ message: 'Error al guardar' });
                     }
                     else {
                        if (!userStored) {
                           res.status(404).send({ message: 'No se a registrado el usuario' });
                        }
                        else {
                           res.status(200).send({ user: userStored });
                        }
                     }
                  });
               });
            }
            else {
               res.status(404).send({ message: 'El usuario ya existe' });
            }
         }
      });

   }
   else {
      res.status(200).send({
         message: 'Ingrese los datos correctamente'
      });
   }
}

function updateUser(req, res) {
   console.log(req);
   let userId = req.params.id;
   let update = req.body;
   delete update.password;

   if (userId != req.user.sub) {
      return res.status(404).send({ message: 'no tienes permiso para actualizar' })
   }
   User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
      if (err) {
         res.status(500).send({
            message: 'Error al actualizar el usuario'
         });
      }
      else {
         if (!userUpdated) {
            res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
         }
         else {
            res.status(200).send({ user: userUpdated })
         }
      }
   })

}

function uploadImage(req, res) {
   let userId = req.params.id;
   let file_name = 'No subido....';

   if (req.files) {

      let file_path = req.files.image.path;
      let file_split = file_path.split('/');
      let file_name = file_split[2];
      let ext_split = file_name.split('.');
      let file_ext = ext_split[1];

      if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'gif' || file_ext == 'jpeg') {
         if (userId != req.user.sub) {
            return res.status(404).send({ message: 'no tienes permiso para actualizar' })
         }
         User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, userUpdated) => {
            if (err) {
               res.status(500).send({
                  message: 'Error al actualizar el usuario'
               });
            }
            else {
               if (!userUpdated) {
                  res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
               }
               else {
                  res.status(200).send({ user: userUpdated, image: file_name })
               }
            }
         })
      }
      else {
         fs.unlink(file_path,(err)=>{
            if(err){
               res.status(404).send({ message: 'Extension no valida y fichero no borrado' });
            }
            else{
               res.status(404).send({ message: 'Extension no valida' });
            }
         });
      }
   }
   else {
      res.status(404).send({ message: 'No se ha subido' });
   }
}

function getImageFile(req,res){
   let imageFile = req.params.imageFile;
   let path_file = './uploads/users/' + imageFile;

   fs.exists(path_file,(exist)=>{
      if(exist){
         res.sendFile(path.resolve(path_file));
      }
      else{
         res.status(404).send({ message: 'La imagen no existe' });
      }
   })
}

function getKeepers(req,res){
   User.find({role:'ROLE_ADMIN'}).exec((err,users)=>{
      if(err){
         res.status(500).send({ message: 'Error en la peticion' });
      }
      else{
         if(!users){
            res.status(500).send({ message: 'No hay data' });  
         }
         else{
            res.status(200).send({users})
         }
      }
   })
   
}

module.exports = {
   pruebas,
   saveUser,
   login,
   updateUser,
   uploadImage,
   getImageFile,
   getKeepers
}
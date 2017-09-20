'use strict'

{/*Modulos*/ }
var fs = require('fs');
var path = require('path');

{/*Modelos*/ }
var User = require('../models/user');
var Animal = require('../models/animal');

{/*Acciones*/ }
function pruebas(req, res) {
   res.status(200).send({
      message: 'Probando el controlador de animales de acciones proebas',
      user: req.user
   });
}

function saveAnimal(req, res) {
   let animal = new Animal();
   let params = req.body;

   if (params.name) {
      animal.name = params.name;
      animal.description = params.description;
      animal.year = params.year;
      animal.image = null;
      animal.user = req.user.sub;

      animal.save((err, animalStorage) => {
         if (err) {
            res.status(500).send({
               message: 'Problema al guardar',
            });
         }
         else {
            if (!animalStorage) {
               res.status(404).send({
                  message: 'No se a guardado el animal',
               });
            }
            else {
               res.status(200).send({ animal: animalStorage });
            }
         }
      });
   }
   else {
      res.status(200).send({ message: 'El nombre es obligatorio' });
   }


}

function getAnimals(req, res) {
   Animal.find({}).populate({ path: 'user' }).exec((err, animals) => {
      if (err) {
         res.status(500).send({ message: 'Error en la consulta' });
      }
      else {
         if (!animals) {
            res.status(404).send({ message: 'No hay animales' });
         }
         else {
            res.status(200).send({ animals });
         }
      }
   });
}

function getAnimal(req, res) {
   let animalId = req.params.id;
   Animal.findById(animalId).populate({ path: 'user' }).exec((err, animal) => {
      if (err) {
         res.status(500).send({
            message: 'Error en la peticion ',
         });
      }
      else {
         if (!animal) {
            res.status(404).send({
               message: 'El animal no existe',
            });
         }
         else {
            res.status(200).send({ animal });
         }
      }
   });
}

function updateAnimal(req, res) {
   let animalId = req.params.id;
   let update = req.body;
   Animal.findByIdAndUpdate(animalId, update, { new: true }, (err, animalUpadate) => {
      if (err) {
         res.status(500).send({ message: 'Error en la petición' });
      }
      else {
         if (!animalUpadate) {
            res.status(404).send({ message: 'No se a actulizado el animal' });
         }
         else {
            res.status(200).send({ animal: animalUpadate });
         }
      }
   });
}

function uploadImage(req, res) {
   let animalId = req.params.id;
   let file_name = 'No subido....';

   if (req.files) {

      let file_path = req.files.image.path;
      let file_split = file_path.split('/');
      let file_name = file_split[2];
      let ext_split = file_name.split('.');
      let file_ext = ext_split[1];

      if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'gif' || file_ext == 'jpeg') {
         Animal.findByIdAndUpdate(animalId, { image: file_name }, { new: true }, (err, animalUpdated) => {
            if (err) {
               res.status(500).send({
                  message: 'Error al actualizar el usuario'
               });
            }
            else {
               if (!animalUpdated) {
                  res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
               }
               else {
                  res.status(200).send({ user: animalUpdated, image: file_name })
               }
            }
         })
      }
      else {
         fs.unlink(file_path, (err) => {
            if (err) {
               res.status(404).send({ message: 'Extension no valida y fichero no borrado' });
            }
            else {
               res.status(404).send({ message: 'Extension no valida' });
            }
         });
      }
   }
   else {
      res.status(404).send({ message: 'No se ha subido' });
   }
}

function getImageFile(req, res) {
   let imageFile = req.params.imageFile;
   let path_file = './uploads/animals/' + imageFile;

   fs.exists(path_file, (exist) => {
      if (exist) {
         res.sendFile(path.resolve(path_file));
      }
      else {
         res.status(404).send({ message: 'La imagen no existe' });
      }
   })
}

function deleteAnimal(req, res) {
   let animalId = req.params.id;
   Animal.findByIdAndRemove(animalId, (err, animalRemove) => {
      if (err) {
         res.status(500).send({ message: 'Error en la peticion' });
      }
      else {
         if (!animalRemove) {
            res.status(404).send({ message: 'No se borro el animal' });
         }
         else {
            res.status(200).send({ animal: animalRemove });
         }
      }
   });
}

module.exports = {
   pruebas,
   saveAnimal,
   getAnimals,
   getAnimal,
   updateAnimal,
   uploadImage,
   getImageFile,
   deleteAnimal
}
'use strict'
let express = require('express');
let AnimalController = require('../controllers/animal');

let api = express.Router();
let mdAuto = require('../middlewares/authenticated');
let mdAdmin = require('../middlewares/is_admin');

let mulpitart = require('connect-multiparty');
let mdUpload = mulpitart({ uploadDir: './uploads/animals' });

api.get('/pruebas-animales', mdAuto.ensureAuth, AnimalController.pruebas);
api.post('/animal', [mdAuto.ensureAuth, mdAdmin.isAdmin], AnimalController.saveAnimal);
api.get('/animals', AnimalController.getAnimals);
api.get('/animal/:id', AnimalController.getAnimal);
api.put('/animal/:id', [mdAuto.ensureAuth, mdAdmin.isAdmin], AnimalController.updateAnimal);
api.post('/upload-image-animal/:id', [mdAuto.ensureAuth, mdAdmin.isAdmin, mdUpload], AnimalController.uploadImage);
api.get('/get-image-animal/:imageFile', AnimalController.getImageFile);
api.delete('/animal/:id', [mdAuto.ensureAuth, mdAdmin.isAdmin], AnimalController.deleteAnimal);
module.exports = api;
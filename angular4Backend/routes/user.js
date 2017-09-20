'use strict'
let express = require('express');
let UserController = require('../controllers/user');

let api = express.Router();
let mdAuto = require('../middlewares/authenticated');

let mulpitart = require('connect-multiparty');
let mdUpload = mulpitart({uploadDir: './uploads/users'});

api.get('/pruebas-del-controlador',mdAuto.ensureAuth,UserController.pruebas);
api.post('/register',UserController.saveUser);
api.post('/login',UserController.login);
api.put('/update-user/:id',mdAuto.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id',[mdAuto.ensureAuth,mdUpload], UserController.uploadImage);
api.get('/get-image-file/:imageFile',UserController.getImageFile);
api.get('/keepers',UserController.getKeepers);
module.exports = api;
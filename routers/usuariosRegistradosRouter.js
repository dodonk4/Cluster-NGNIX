import express from 'express';
import { Router } from 'express';

import passport from 'passport';


import controladorUserMongoDb from '../controladores/controladorUserMongoDb.js';

const routerUsuariosRegistrados = new Router();

routerUsuariosRegistrados.use(express.json());
routerUsuariosRegistrados.use(express.urlencoded({ extended: true }));

routerUsuariosRegistrados.get('/register/', controladorUserMongoDb.getAll);
routerUsuariosRegistrados.post('/register/', passport.authenticate('local', { failureRedirect: '/fail-registro', failureFlash: true}), controladorUserMongoDb.create);



export default routerUsuariosRegistrados;
import express from 'express';
import { Router } from 'express';

import controladorApiRandom from '../controladores/controladorApiRandom.js';

const routerRandom = new Router();

routerRandom.use(express.json());
routerRandom.use(express.urlencoded({ extended: true }));

routerRandom.get('/api/randoms', controladorApiRandom.calcular);




export default routerRandom;
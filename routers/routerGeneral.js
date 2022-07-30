import express from 'express';
import { Router } from 'express';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import controladorGeneral from '../controladores/controladorGeneral.js';
import controladorComplejo from '../controladores/controladorComplejo.js';
import { passportMiddleware } from '../passport/passport.js';
import { passportSessionHandler } from '../passport/passport.js';
import controladorFail from '../controladores/controladorFail.js';

const mainRouter = new Router();
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mainRouter.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://root:1234@cluster0.5xw3itz.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: advancedOptions
    }),
    secret: '123456789',
    resave: true,
    saveUninitialized: true
}));
mainRouter.use(passportMiddleware);
mainRouter.use(passportSessionHandler);
mainRouter.use(express.json());
mainRouter.use(express.urlencoded({ extended: true }));

mainRouter.get('/registro', controladorGeneral.getRegistro);
mainRouter.post('/login', controladorGeneral.postLogin);
mainRouter.get('/login', controladorGeneral.getLogin);
mainRouter.get('/inicio', controladorComplejo.getInicio);
mainRouter.post('/inicio', passport.authenticate('login', { failureRedirect: '/fail-login', failureFlash: true}), controladorComplejo.postInicio);
mainRouter.get('/fail-registro', controladorFail.getFailRegistro);
mainRouter.get('/fail-login', controladorFail.getFailLogin);
mainRouter.get('/logout', controladorGeneral.getLogout);
mainRouter.get('/info', controladorComplejo.getInfo)

export default mainRouter;
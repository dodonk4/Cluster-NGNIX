import express from 'express';

import http from 'http';

import { Server as serverIO} from 'socket.io';

import Contenedor from './public/contenedores/productos.js'

import Mensajeria from './public/contenedores/mensajes.js'

import bodyParser from 'body-parser';

import { engine } from 'express-handlebars';

import flash from 'connect-flash';

import routerUsuariosRegistrados from './routers/usuariosRegistradosRouter.js';

import routerRandom from './routers/routerRandom.js';

import mainRouter from './routers/routerGeneral.js';

import dotenv from 'dotenv';

import {puerto} from './minimist/minimist.js'

import {setupWorker} from '@socket.io/sticky';

import { createAdapter } from '@socket.io/cluster-adapter';




dotenv.config({
    path: './.env'
      
  })


const caja = new Contenedor();
const mensajeriaANormalizar = new Mensajeria('./public/texto/mensajesANormalizar.txt');

const app = express()

app.engine('handlebars', engine({defaultLayout: "index"}));
app.set('view engine', 'handlebars');
app.set("views", "./public/views");
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(bodyParser.urlencoded());
app.use(flash());
app.use(routerUsuariosRegistrados);
app.use(mainRouter);
app.use(routerRandom);
const httpServer = new http.Server(app);
const io = new serverIO(httpServer);


function crearServidor(port) {
    httpServer.listen(puerto, () => {
            console.log(`escuchando en puerto ${puerto}`)
        })

        io.on('connection', async (socket)=>{
    
            console.log('Usuario conectado: ' + socket.id);
        
        
            socket.on('prod', async(data)=>{
                caja.insertarProductosIndividuales(data);
                console.log('llego al servidor el socket PRODUCTOS');
                io.sockets.emit('prod', data)
            })
        
            socket.on('mensaje', async(data)=>{
                mensajeriaANormalizar.insertarMensajesIndividuales(data.cosa2);
                console.log('llego al servidor el socket MENSAJES')
                io.sockets.emit('mensaje', data);
        
            })
        
        })
}

function crearServidorCluster(port) {
    console.log(`Worker ${process.pid} started`)
    io.adapter(createAdapter());
    setupWorker(io);

    io.on('connection', async (socket)=>{
    
        console.log('Usuario conectado: ' + socket.id);
    
    
        socket.on('prod', async(data)=>{
            caja.insertarProductosIndividuales(data);
            console.log('llego al servidor el socket PRODUCTOS');
            io.sockets.emit('prod', data)
        })
    
        socket.on('mensaje', async(data)=>{
            mensajeriaANormalizar.insertarMensajesIndividuales(data.cosa2);
            console.log('llego al servidor el socket MENSAJES')
            io.sockets.emit('mensaje', data);
    
        })
    
    })
}

export {crearServidor, crearServidorCluster};
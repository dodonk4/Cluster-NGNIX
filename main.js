import { crearServidor } from './server.js';

const puerto = process.env.PORT ?? 0;

crearServidor(puerto);
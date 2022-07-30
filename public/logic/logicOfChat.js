const socket = io();
const barraDeMensaje = document.getElementById('barraDeMensaje');
const botonDeEnviar = document.getElementById('botonDeEnviar');
const logearse = document.getElementById('logearse');
const contenedorDeMensajes = document.getElementById('contenedorDeMensajes');

import eventoDeLog from '../eventos/chatLogEvent.js'
import eventoDeSend from '../eventos/chatSendEvent.js';

barraDeMensaje.disabled = true;
botonDeEnviar.disabled = true;

let email = "";

logearse.addEventListener('click', event=>{
    email = eventoDeLog();
    
} );

botonDeEnviar.addEventListener('click', event=>{eventoDeSend(email)});


socket.on('mensaje', function(data){
    const msj = document.createElement('li');
    msj.innerHTML = `<p style ="color: blue; font-weight: bold; display: inline-block;">${data.email}</p> <p style ="color: brown; display: inline-block;">${data.nombre}</p> <p style ="color: green; font-style: italic; display: inline-block;">${data.msssj}</p>`;
    contenedorDeMensajes.append(msj);
})
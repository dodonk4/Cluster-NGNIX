const socket = io();
const barraDeMensaje = document.getElementById('barraDeMensaje');
const nombreDeUsuario = document.getElementById('nombreDeUsuario');
const apellidoDeUsuario = document.getElementById('apellidoDeUsuario');
const edadDeUsuario = document.getElementById('edadDeUsuario');
const aliasDeUsuario = document.getElementById('aliasDeUsuario');
const avatarDeUsuario = document.getElementById('avatarDeUsuario');


const eventoDeSend = (Email)=>{
    if(barraDeMensaje.value != ""){
    console.log(barraDeMensaje.value);
    let date1 = new Date();
    let date = date1.toISOString().split('T')[0];
    const email = Email;
    const msssj = barraDeMensaje.value;
    const nombre = nombreDeUsuario.value;
    const apellido = apellidoDeUsuario.value;
    const edad = edadDeUsuario.value;
    const alias = aliasDeUsuario.value;
    const avatar = avatarDeUsuario.value;
    const cosa = `{
        "id": ${Date.now()},
        "text": "${msssj}",
            "author": {"email": "${email}",
                        "name": "${nombre}",
                        "surname": "${apellido}",
                        "age": "${edad}",
                        "alias": "${alias}",
                        "avatar": "${avatar}"}
        }`;
    const cosa2 = JSON.parse(cosa);
    barraDeMensaje.value = "";
    socket.emit('mensaje', {email, msssj, nombre, apellido, edad, alias, avatar, cosa2} )
    console.log('socket enviado');
    }
}

export default eventoDeSend;
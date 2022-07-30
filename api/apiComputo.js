import calculo from './apiRandom.js'

process.on('message', async (msg) => {
    console.log(msg);
    process.send(calculo(msg));

    process.exit(1);

})

process.send('listo')
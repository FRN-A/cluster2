const cluster = require('cluster');

console.log(`pid master:  ${process}`);

cluster.setupMaster({
    exec: __dirname + '/servicio-fibonacci.js'
});

cluster.fork();
cluster.fork();
cluster.fork();

cluster
    .on('disconnect', (worker) => {
        console.log(`Se desconectó: ${worker.id}`);
    })
    .on('exit', (worker) => {
        console.log(`Salió: ${worker.id}`);
        cluster.fork();
    })
    .on('listening', (worker, {address, port}) => {
        console.log(`Escuchandp: ${address}:${port}`);
    });
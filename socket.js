                         
class Socket {
    constructor(io) {
        this.io = io;
        this.listener();
        this.users = new Map();
    }

    listener() {
        this.io.on('connection', (socket) => {
            console.log('Un cliente se ha conectado' + socket.id);
        
            socket.on('autenticar', (data) => {   
                /* console.log(typeof data ); */
                const user = JSON.parse(data);
                this.users.set(user.id, socket.id);
                console.log(this.users);

            });

            socket.on('notificar-desaparecido', (data) => {
                /* console.log(typeof data);
                console.log(data); */
                const personaEncontrada = JSON.parse(data);
                console.log(personaEncontrada);
                const sockectId = this.users.get(personaEncontrada.userId);
                console.log(sockectId);

                    const mensage = `se ha encontrado a ${personaEncontrada.nombre}`
                    //notifica a un usuario especifico
                   this.io.to(sockectId).emit('notificar', mensage);
            });

            socket.on('disconnect', () => {
                console.log(`Usuario desconectado:`);
              });
        });
    }


}


export default Socket;
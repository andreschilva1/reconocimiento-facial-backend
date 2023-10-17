import "dotenv/config";
import express, { json, urlencoded} from 'express';
import path from 'path';
import  db  from './database/db.js'; //importar la conexion a la base de datos
import routes , {routeMappings} from './routes/index.routes.js'; //importar todas las rutas
import  http  from 'http';
import { Server as SocketIo } from 'socket.io';
import Socket from "./socket.js";
import cors from 'cors';

class AppServer {
    
    constructor() {
        //inicializar express y sockect.io
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new SocketIo(this.server);
        this.PORT = process.env.PORT || 3000;
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //para express pueda leer los datos enviados formulario y json
        this.app.use(urlencoded({extended: true}));
        this.app.use(json());

        //seteamos la carpeta public para archivos estaticos
        const publicPath = path.resolve('public');
        this.app.use(express.static(publicPath));
    }

    rutas(){
        //seteamos todas las rutas de la app
        routeMappings.forEach(routeMapping => {
          const { routeName, prefix } = routeMapping;
          this.app.use(prefix, routes[routeName]);
        });
    }

    sincronizarBaseDatos(){
        db.sync({alter : true})
          .then(() => {
            console.log('¡La base de datos está sincronizada!');
            // ... Iniciar tu servidor Express o realizar otras operaciones ...
          })
          .catch((error) => {
            console.error('Error al sincronizar la base de datos:', error);
        });
    }

    configurarSockets(){
        new Socket( this.io );
    }

    executeServer(){
        this.middlewares();
        this.rutas();
        this.sincronizarBaseDatos();
        this.configurarSockets();
        
        this.server.listen(this.PORT, () => console.log(`Server on port ${this.PORT}`));
    }
}

export default AppServer;




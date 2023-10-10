import "dotenv/config";
import express, { json, urlencoded} from 'express';
import path from 'path';
import  db  from './database/db.js'; //importar la conexion a la base de datos
import routes , {routeMappings} from './routes/index.routes.js'; //importar todas las rutas

//inicializar express
const app = express();

//para que express pueda leer los datos enviados formulario y json
app.use(urlencoded({extended: true}));
app.use(json());

//seteamos la carpeta public para archivos estaticos
const publicPath = path.resolve('public');
app.use(express.static(publicPath));

//seteamos todas las rutas de la app
routeMappings.forEach(routeMapping => {
  const { routeName, prefix } = routeMapping;
  app.use(prefix, routes[routeName]);
});

db.sync()
  .then(() => {
    console.log('¡La base de datos está sincronizada!');
    // ... Iniciar tu servidor Express o realizar otras operaciones ...
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
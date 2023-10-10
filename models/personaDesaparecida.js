import { DataTypes } from 'sequelize';
import  db from '../database/db.js';

const PersonaDesaparecida = db.define('persona_desaparecida', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    edad: DataTypes.STRING,
    sexo: DataTypes.STRING,
  });
  
  
  
  export default PersonaDesaparecida;
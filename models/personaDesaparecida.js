import { DataTypes } from 'sequelize';
import  db from '../database/db.js';
import User from './user.js';

const PersonaDesaparecida = db.define('persona_desaparecida', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    edad: DataTypes.STRING,
    sexo: DataTypes.STRING,
  });
  
  PersonaDesaparecida.belongsTo(User, {
    as: 'user',
  });

  User.hasMany(PersonaDesaparecida, {
    as: 'persona_desaparecida',
  });
  
  export default PersonaDesaparecida;
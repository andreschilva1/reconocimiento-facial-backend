import { DataTypes } from 'sequelize';
import  db from '../database/db.js';
import PersonaDesaparecida from './personaDesaparecida.js';

const Foto = db.define('foto', {
    nombre : DataTypes.STRING,
    url : DataTypes.STRING,
    faceDescriptor : DataTypes.JSON,
  });
  
  
  Foto.belongsTo(PersonaDesaparecida, {
    as: 'persona_desaparecida',
  });

  PersonaDesaparecida.hasMany(Foto, {
    as: 'fotos',
  });

  export default Foto;
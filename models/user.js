import { DataTypes } from 'sequelize';
import  db from '../database/db.js';

const User = db.define('user', {
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    celular: DataTypes.STRING,
    
  });
  
  
  export default User;
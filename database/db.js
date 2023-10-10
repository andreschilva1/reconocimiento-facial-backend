import Sequelize from 'sequelize';
import "dotenv/config";

const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres', // o el dialecto correspondiente a tu base de datos
});

export default db;


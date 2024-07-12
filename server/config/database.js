import Sequelize from 'sequelize';
const username = process.env.DB_USERNAME;
const password =  process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    timezone: 'Europe/Amsterdam', // Set the timezone to Amsterdam
    dialectOptions: {
        useUTC: false, // Do not use UTC; use local time
        timezone: 'local'
    }
});

export default sequelize;
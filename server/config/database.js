import Sequelize from 'sequelize';
import config from '../../config/config.json' assert { type: 'json' };
const environment = 'development';
const { username, password, database, host, dialect } = config[environment];


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
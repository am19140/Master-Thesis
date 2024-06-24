import Sequelize from 'sequelize';
import config from '../../config/config.json' assert { type: 'json' };
const environment = 'development';
const { username, password, database, host, dialect } = config[environment];


const sequelize = new Sequelize(database, username, password, {
    host,
    dialect
});

export default sequelize;
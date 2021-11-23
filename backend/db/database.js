import SQ from 'sequelize';
import { config } from '../config.js';

const { host, database, user, password } = config.db

export const sequelize = new SQ.Sequelize(
    database,
    user,
    password,
    {
        port: 3305,
        host,
        dialect: "mariadb"
    }
)
import { Sequelize } from 'sequelize';
import { config } from './db-config'

export const sequelizeDB = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: 'postgres',
        port: config.port,
        dialectOptions: {
            ssl: true
        },
    },
);

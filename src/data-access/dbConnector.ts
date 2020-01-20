import { Sequelize } from 'sequelize';
import { config } from './db-config'

export const sequelize = new Sequelize(
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

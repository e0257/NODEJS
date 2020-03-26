const path = require('path');
require('dotenv').config({path:  path.resolve(__dirname, '../.env')});


export const config: any = {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    host2: process.env.DB_HOST2,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    url: process.env.DB_URL
};

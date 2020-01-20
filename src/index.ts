import express from 'express';
import router from './controllers/router';
import { errorValidateHandler } from './errorHandler';
import { sequelize } from "./data-access/dbConnector";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);
app.use(errorValidateHandler);
app.listen(4400, () => console.log('Server is started'));

async  function f() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:');
        console.error(error);
    }
}

f();
import express from 'express';
import controller from './controller';
import { errorValidateHandler } from './errorHandler';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', controller.router);
app.use(errorValidateHandler);
app.listen(4200, () => console.log('Server is started'));

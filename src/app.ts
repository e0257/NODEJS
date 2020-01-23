import express from 'express';
import router from './controllers/router';
import { errorValidateHandler } from './errorHandler';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);
app.use(errorValidateHandler);
app.listen(4000, () => console.log('Server is started'));
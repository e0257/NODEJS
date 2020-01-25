import express from 'express';
import router from './routes/router';
import { errorValidateHandler } from './error-handlers/errorHandler';

const port = 4400;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);
app.use(errorValidateHandler);
app.listen(port, () => console.log(`Server is started on port: ${port}`));
import express from 'express';
import { router } from './routes';
import { errorHandler, errorValidateHandler } from './error-handlers/errorHandler';
import { expressLogger, expressErrorLogger } from './config'

const port = 4200;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLogger);
app.use('/', router);
app.use(expressErrorLogger);
app.use(errorValidateHandler);
app.use(errorHandler);
app.listen(port, () => console.log(`Server is started on port: ${port}`));

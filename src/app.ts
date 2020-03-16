import cors from 'cors';
import express from 'express';
import { jwt } from './middlewares';
import { router } from './routes';
import { errorAuthHandler, errorHandler, errorValidateHandler } from './error-handlers/errorHandler';
import { expressLogger, expressErrorLogger } from './config'

const port = 4200;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(jwt());
app.use(expressLogger);
app.use('/', router);
app.use(errorAuthHandler);
app.use(expressErrorLogger);
app.use(errorValidateHandler);
app.use(errorHandler);
app.listen(port, () => console.log(`Server is started on port: ${port}`));

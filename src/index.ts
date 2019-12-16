import express from 'express';
import controller from './controller';

const app = express();

app.use('/', controller.router)
app.listen(4400, () => console.log('Server is started'));


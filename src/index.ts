import express from 'express';
import controller from './controller';

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/', controller.router);
app.listen(4000, () => console.log('Server is started'));


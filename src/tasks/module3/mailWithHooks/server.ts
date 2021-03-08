import express, { Express } from 'express';
import router from './routes/sendEmail';

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

const port: number = 8080;

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});

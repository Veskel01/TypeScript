import express, { Express } from 'express';
import cors from 'cors';
import translateData from './autoTranslator';
import { checkIfFileExists } from './JsonService';

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Wpisz język do tłumaczenia po / w url');
});

app.get('/:lang', (req, res) => {
  const { lang } = req.params;
  const translate = async (): Promise<void> => {
    const checkIfJSONfileExists: string | undefined = checkIfFileExists(lang);
    if (typeof checkIfJSONfileExists === 'object') {
      res.send(checkIfJSONfileExists);
    } else {
      try {
        await translateData(lang).then((value: string): void => {
          res.send(value);
        });
      } catch (error) {
        if (error) {
          res.send({ status: 404, error: error.message });
        }
      }
    }
  };
  translate();
});

const port: number = 8080;
app.listen(port, () => {
  console.log(`Listen`);
});

import express, { Express } from 'express';
import cors from 'cors';
import { checkIfFileExists, saveFileInCache } from './JsonService';
import fetchData from './fetchData';

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  const query: string | undefined = req.query.q?.toString();
  if (query) {
    try {
      const cachedFile: string | undefined = await checkIfFileExists(query);
      if (cachedFile !== undefined) {
        res.send(cachedFile);
      } else {
        const dataFromFetch: unknown = await fetchData(query);
        await saveFileInCache(query, dataFromFetch);
        res.send(dataFromFetch);
      }
    } catch (error) {
      if (error) {
        res.send({ status: 404, error: error.message });
      }
    }
  }
});

const port: number = 2000;

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});

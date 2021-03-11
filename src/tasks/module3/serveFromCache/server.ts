import express, { Express } from "express";
import cors from "cors";
import { checkIfFileExists, saveFileInCache } from "./JsonService";
import fetchData from "./fetchData";
import router from "./routes/queryRoute";

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

const port: number = 2000;

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});

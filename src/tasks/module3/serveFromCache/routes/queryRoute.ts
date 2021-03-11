import Express, { Router, Request, Response } from "express";
import fetchData from "../fetchData";
import { checkIfFileExists, saveFileInCache } from "../JsonService";

const router: Router = Router();

router.route("/").get(async (req: Request<string>, res: Response<unknown>) => {
  const query: string | undefined = req.query.q?.toString();
  if (!query) {
    res.send(`Put query in link /?q=`);
  } else {
    try {
      const cachedFile: string | undefined = await checkIfFileExists(query);
      if (cachedFile !== undefined) {
        res.send(cachedFile);
      } else {
        const dataFromFetch = await fetchData(query);
        await saveFileInCache(query, dataFromFetch);
        res.send(dataFromFetch);
      }
    } catch (error) {
      res.send({ status: 404, error });
    }
  }
});

export default router;

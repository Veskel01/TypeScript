const recursivePromise = (arrayOfPromises: Promise<unknown>[], results: unknown[] = []): Promise<unknown> => {
  return new Promise(
    async (resolve, reject): Promise<void> => {
      try {
        for await (const item of arrayOfPromises) {
          results.push(item);
        }
        if (arrayOfPromises.slice()) {
          resolve(results);
        }
      } catch (error) {
        if (error) {
          reject(results);
          throw new Error(error);
        }
      }
    }
  );
};

export default recursivePromise;

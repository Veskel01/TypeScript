const recursivePromise = (arrayOfPromises: Promise<unknown>[]) => {
  const result: unknown[] = [];
  return new Promise(async (resolve, reject) => {
    try {
      for await (const item of arrayOfPromises) {
        result.push(item);
      }
    } catch (error) {
      resolve(result);
      if (error) {
        reject(result);
        return false;
      }
    }
    if (arrayOfPromises.slice()) {
      resolve(result);
    }
  });
};

export default recursivePromise;

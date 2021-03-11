// Promise all method

export const promiseAll = (arrayOfPromises: Promise<unknown>[]): Promise<unknown> => {
  const result: unknown[] = [];
  return new Promise(
    async (resolve, reject): Promise<void> => {
      try {
        for await (const item of arrayOfPromises) {
          result.push(item);
        }
        if (result.slice()) {
          resolve(result);
        }
      } catch (error) {
        if (error) {
          reject(new Error(error));
        }
      }
    }
  );
};

// Promise race method

export const promiseRace = <T>(arrayOfPromises: Promise<unknown>[]): Promise<unknown | void> => {
  return new Promise((resolve, reject): void => {
    arrayOfPromises.forEach((singlePromise: Promise<unknown>) => {
      Promise.resolve(singlePromise)
        .then(resolve)
        .catch((error: string) => reject(new Error(error)));
    });
  });
};

// Promise last method

export const promiseLast = <T>(arrayOfPromises: Promise<any>[]): Promise<T> => {
  let count: number = arrayOfPromises.length;
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach((singlePromise: Promise<T>) => {
      count--;
      singlePromise.catch((error: string) => {
        if (count === 0) {
          reject(new Error(error));
        }
      });
      if (count === 0) {
        resolve(singlePromise);
      }
    });
  });
};

// Promise ignore Errors method

export const promiseIgnoreErrors = <T>(arrayOfPromises: Promise<any>[]): Promise<any> => {
  const results: T[] = [];
  return new Promise((resolve): void => {
    arrayOfPromises.forEach(
      (item: Promise<T>) => {
        item.then((value: T) => {
          results.push(value);
          resolve(results);
        });
      },
      () => {}
    );
  });
};

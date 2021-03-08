// Promise all method

export const promiseAll = <T>(arrayOfPromises: Promise<any>[]): Promise<unknown> => {
  const arrayOfResults: T[] = [];
  return new Promise(
    async (resolve, reject): Promise<void> => {
      let counter: number = arrayOfPromises.length;
      try {
        for await (const item of arrayOfPromises) {
          arrayOfResults.push(item);
          counter--;
          if (counter === 0) {
            resolve(arrayOfResults);
          }
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

export const promiseRace = <T>(arrayOfPromises: Promise<any>[]): Promise<T> => {
  return new Promise((resolve, reject): void => {
    arrayOfPromises.forEach((singlePromise: Promise<T>) => {
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
  return new Promise((resolve, reject): void => {
    arrayOfPromises.forEach((item: Promise<T>) => {
      item.then((value: T) => {
        results.push(value);
        resolve(results);
      });
    }, reject);
  });
};

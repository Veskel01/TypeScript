import fs from 'fs';

export const checkIfFileExists = async (filename: string): Promise<string | undefined> => {
  try {
    const result = await fs.promises.readFile(`cache/${filename}.json`, 'utf8');
    return JSON.parse(result);
  } catch (error) {
    return undefined;
  }
};

export const saveFileInCache = async (filename: string, data: any): Promise<void> => {
  try {
    await fs.promises.writeFile(`cache/${filename}.json`, JSON.stringify(data, undefined, 2));
  } catch (error) {
    return error;
  }
};

import fs from 'fs';

export const checkIfFileExists = (lang: string): string | undefined => {
  try {
    const data = fs.readFileSync(`translated/${lang}.json`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error) {
      return undefined;
    }
  }
};

export const saveFileAsJson = async (lang: string, object: string): Promise<void> => {
  try {
    await fs.promises.writeFile(`translated/${lang}.json`, object);
  } catch (error) {
    throw new Error(error.message);
  }
};

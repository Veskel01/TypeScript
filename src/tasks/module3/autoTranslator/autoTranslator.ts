const { Translate } = require('@google-cloud/translate').v2;
import { saveFileAsJson } from './JsonService';

const projectId: string = 'autotranslator-305214';

const translate = new Translate({
  projectId: projectId,
  keyFilename: './autotranslator-305214-d9bc0c5f938f.json',
});

type PlObjectType = {
  attention: {
    title: string;
    subtitle: string;
    ctaButton: string;
  };
  newsletter: {
    title: string;
    ctaButton: string;
    action: string;
  };
};

const pl: PlObjectType = {
  attention: {
    title: 'Dobrze, że jesteś, sprawdź to zadanie',
    subtitle: 'Pomoże Ci ogarnąć jak zmieniać język w apkach reacta',
    ctaButton: 'Dowiedź się więcej',
  },
  newsletter: {
    title: 'Bądź na bieżąco',
    ctaButton: 'Idź do repo ->',
    action: '/new-subscriber?lang=pl',
  },
};
const translateData = async (lang: string): Promise<string> => {
  const [translation]: [string] = await translate.translate(JSON.stringify(pl, undefined, 2), lang);
  saveFileAsJson(lang, translation);
  return JSON.parse(translation);
};

export default translateData;

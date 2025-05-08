import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { createFolderRecursiveIfNoExist } from "utils/dist/node";

const SRC_PATH = './static_data/rus_dictionary';
const OUT_PATH = join(SRC_PATH, 'dist/by_length');

const LENGTHS = new Array<number>(23).fill(0).map((val, index) => index + 2);

type DataItem = {
  word: string;
  definition: string;
};

(() => {
  const filePath = join(SRC_PATH, 'raw_data.json');
  const fileContent = JSON.parse(readFileSync(filePath).toString()) as DataItem[];

  createFolderRecursiveIfNoExist(OUT_PATH);

  LENGTHS.forEach(length => {
    const data = fileContent.filter(item => item.word.length === length);

    writeFileSync(join(OUT_PATH, `${length}.json`), JSON.stringify(data));
  });

  console.log('dictionary separated');

})();

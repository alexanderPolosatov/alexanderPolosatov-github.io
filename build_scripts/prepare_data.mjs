import { join } from 'path';
import { writeFileSync, readFileSync } from 'fs';

import { createIfNotExist } from './utils/utils.mjs';

const PROJ_FOLDER = './projects/atm_data';

const DIST_FOLDER = join(PROJ_FOLDER, 'dist');
const INPUT_FILE_PATH = join(PROJ_FOLDER, '/data.json');
const OUTPUT_FILE_PATH = `${join(DIST_FOLDER, 'data.json')}`;

function main() {
    function removeSpacesFromFile(inputFilePath, outputFilePath) {
        try {
            const content = readFileSync(inputFilePath, 'utf-8');

            const contentWithoutSpaces = content.replace(/\s/g, '');

            createIfNotExist(DIST_FOLDER);

            writeFileSync(outputFilePath, contentWithoutSpaces, 'utf-8');

            console.log('Data prepared');
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    removeSpacesFromFile(INPUT_FILE_PATH, OUTPUT_FILE_PATH);
}

main();
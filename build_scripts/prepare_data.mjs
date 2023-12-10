import { join } from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { createIfNotExist, getAllDirs } from './utils/utils.mjs';

const STATIC_DATA_FOLDER = './static_data';
const RAW_DATA_FILE_NAME = 'raw_data.json';
const DIST_DATA_FILE_NAME = 'data.json';

function removeSpacesAndNewlinesOutsideQuotes(inputFilePath, outputFilePath) {
    try {
        const content = readFileSync(inputFilePath, 'utf-8');

        const processedContent = content.replace(/("[^"]*")|\s/g, (match, group1) => {
            if (group1) {
                return group1;
            }
            return '';
        });

        writeFileSync(outputFilePath, processedContent, 'utf-8');
        console.log(`Data of ${inputFilePath} file prepared`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function prepareProjects(projectsFolders) {
    projectsFolders.forEach(projectFolder => {
        const distFolder = join(projectFolder, 'dist');

        createIfNotExist(distFolder);
        const inputFilePath = join(projectFolder, RAW_DATA_FILE_NAME);
        const outputFilePath = join(distFolder, DIST_DATA_FILE_NAME);

        removeSpacesAndNewlinesOutsideQuotes(inputFilePath, outputFilePath);
    });
}

function main() {
    const allProjectsFolders = getAllDirs(STATIC_DATA_FOLDER);

    prepareProjects(allProjectsFolders);
}

main();
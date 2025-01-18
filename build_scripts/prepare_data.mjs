import { join } from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { getAllDirs } from './utils/utils.mjs';
import { node } from 'utils';

const STATIC_DATA_FOLDER = './static_data';
const RAW_DATA_FILE_NAME = 'raw_data.json';
const DIST_DATA_FILE_NAME = 'data.json';

function uglifyFileContent(content) {
  const uglifiedContent = content.replace(/("[^"]*")|\s/g, (match, group1) => {
    if (group1) {
      return group1;
    }
    return '';
  });

  return uglifiedContent;
}

function processFile(inputFilePath, outputFilePath) {
  try {
    const content = readFileSync(inputFilePath, 'utf-8');
    const uglifiedContent = uglifyFileContent(content);

    writeFileSync(outputFilePath, uglifiedContent, 'utf-8');
    console.log(`Data of ${inputFilePath} file prepared`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function prepareProjects(projectsFolders) {
  projectsFolders.forEach(projectFolder => {
    const distFolder = join(projectFolder, 'dist');

    node.createFolderRecursiveIfNoExist(distFolder);
    const inputFilePath = join(projectFolder, RAW_DATA_FILE_NAME);
    const outputFilePath = join(distFolder, DIST_DATA_FILE_NAME);

    processFile(inputFilePath, outputFilePath);
  });
}

(function main() {
  const allProjectsFolders = getAllDirs(STATIC_DATA_FOLDER);

  prepareProjects(allProjectsFolders);
})();

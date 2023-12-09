import { join } from 'path';
import { writeFileSync, readFileSync } from 'fs';

import { createIfNotExist } from './utils/utils.mjs';

const projectsInfo = [{
    projectPath: './projects/atm_data',
    fileName: 'data.json'
}, {
    projectPath: './projects/regions_data',
    fileName: 'data.json'
}];

function removeSpacesAndNewlinesOutsideQuotes(inputFilePath, outputFilePath) {
    try {
        const content = readFileSync(inputFilePath, 'utf-8');

        const processedContent = content.replace(/("[^"]*")|\s/g, (match, group1) => {
            if(group1) {
                return group1;
            }
            return '';
        });

        writeFileSync(outputFilePath, processedContent, 'utf-8');
        console.log('Data prepared');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function prepareProjects(projects) {
    projects.forEach(project => {
        const distFolder = join(project.projectPath, 'dist');
    
        createIfNotExist(distFolder);
        const inputFilePath = join(project.projectPath, project.fileName);
        const outputFilePath = join(distFolder, project.fileName);
    
    
        removeSpacesAndNewlinesOutsideQuotes(inputFilePath, outputFilePath);
    });
}

function main() {
    prepareProjects(projectsInfo);
}

main();
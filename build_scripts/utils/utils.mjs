import { existsSync, mkdirSync, readdirSync, lstatSync } from 'fs';
import { join } from 'path';

const isDirectory = fileName => {
    return lstatSync(fileName).isDirectory();
};

export function createIfNotExist(dirPath) {
    if (!existsSync(dirPath)){
        mkdirSync(dirPath, { recursive: true });
    }
}

export function getAllDirs(path) {
    const files = readdirSync(path);

    return files.map(fileName => {
        return join(path, fileName);
    }).filter(isDirectory);
}

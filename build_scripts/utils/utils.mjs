import { existsSync, mkdirSync } from 'fs';

export function createIfNotExist(dirPath) {
    if (!existsSync(dirPath)){
        mkdirSync(dirPath, { recursive: true });
    }
}
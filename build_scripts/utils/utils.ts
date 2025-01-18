import { readdirSync } from 'fs';
import { join } from 'path';
import { node } from 'utils';

export function getAllDirs(path: string) {
  const files = readdirSync(path);

  return files.map(fileName => {
    return join(path, fileName);
  }).filter(node.isDirectory);
}

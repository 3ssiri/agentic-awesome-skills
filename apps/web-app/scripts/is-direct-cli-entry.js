import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function isDirectCliEntry(moduleUrl, argvPath = process.argv[1]) {
  if (!argvPath) {
    return false;
  }

  return path.resolve(fileURLToPath(moduleUrl)) === path.resolve(argvPath);
}

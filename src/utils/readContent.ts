import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
export const readContent = async (filePath: string): Promise<string> => {
  const content = await readFile(filePath, { encoding: 'utf-8' });
  return content;
};

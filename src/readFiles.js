import fs from 'fs';
import getExtension from './getExtension';

export default (firstPath, secondPath) => {
  const firstFile = fs.readFileSync(firstPath, 'utf-8');
  const secondFile = fs.readFileSync(secondPath, 'utf-8');
  const extension = getExtension(firstPath);

  return [extension, firstFile, secondFile];
};

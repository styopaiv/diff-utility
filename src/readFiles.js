import fs from 'fs';
import getExtension from './getExtension';
import parseConfig from './parseConfig';

export default (firstPath, secondPath) => {
  const firstFile = fs.readFileSync(firstPath, 'utf-8');
  const secondFile = fs.readFileSync(secondPath, 'utf-8');
  const extension = getExtension(firstPath);

  return parseConfig(extension, firstFile, secondFile);
};

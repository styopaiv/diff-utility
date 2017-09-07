import fs from 'fs';
import path from 'path';
import parseConfig from './parseConfig';
import compare from './index';

export default (firstPath, secondPath) => {
  const firstFile = fs.readFileSync(firstPath, 'utf-8');
  const secondFile = fs.readFileSync(secondPath, 'utf-8');
  const extension = path.extname(firstPath);
  const beforeObj = parseConfig(extension, firstFile);
  const afterObj = parseConfig(extension, secondFile);

  return compare(beforeObj, afterObj);
};

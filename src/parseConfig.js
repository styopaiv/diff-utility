import path from 'path';
import yaml from 'js-yaml';

export default (filePath, firstFile, secondFile) => {
  const extension = path.extname(filePath);

  let beforeObj;
  let afterObj;

  if (extension === '.json') {
    beforeObj = JSON.parse(firstFile);
    afterObj = JSON.parse(secondFile);
  } else if (extension === '.yml') {
    beforeObj = yaml.load(firstFile);
    afterObj = yaml.load(secondFile);
  }
  return [beforeObj, afterObj];
};

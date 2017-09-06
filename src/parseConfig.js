import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

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
  } else if (extension === '.ini') {
    beforeObj = ini.parse(firstFile);
    afterObj = ini.parse(secondFile);
  }
  return [beforeObj, afterObj];
};

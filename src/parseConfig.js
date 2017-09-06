import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';
import compare from './compare';

export default (extension, firstFile, secondFile) => {
  const parseOptions = [
    {
      ext: '.json',
      parse: filePath => JSON.parse(filePath),
    },
    {
      ext: '.yml',
      parse: filePath => yaml.load(filePath),
    },
    {
      ext: '.ini',
      parse: filePath => ini.parse(filePath),
    },
  ];

  const option = _.find(parseOptions, obj => obj.ext === extension);
  const beforeObj = option.parse(firstFile);
  const afterObj = option.parse(secondFile);

  return compare(beforeObj, afterObj);
};

import yaml from 'js-yaml';
import ini from 'ini';

export default (extension, file) => {
  const parseOptions = new Map();

  parseOptions.set('.json', () => JSON.parse(file));
  parseOptions.set('.yml', () => yaml.load(file));
  parseOptions.set('.ini', () => ini.parse(file));

  const parse = parseOptions.get(extension);
  return parse(file);
};

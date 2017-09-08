import yaml from 'js-yaml';
import ini from 'ini';

const parseOptions = new Map();
const [jsonExt, ymlExt, yamlExt, iniExt] = ['.json', '.yml', '.yaml', '.ini'];

export default (extension, file) => {
  parseOptions.set(jsonExt, arg => JSON.parse(arg));
  parseOptions.set(ymlExt, arg => yaml.load(arg));
  parseOptions.set(yamlExt, arg => yaml.load(arg));
  parseOptions.set(iniExt, arg => ini.parse(arg));

  const parse = parseOptions.get(extension);
  return parse(file);
};

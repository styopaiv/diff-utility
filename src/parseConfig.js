import yaml from 'js-yaml';
import ini from 'ini';

export default (extension, file) => {
  const parsers = {
    '.json': arg => JSON.parse(arg),
    '.yml': arg => yaml.load(arg),
    '.yaml': arg => yaml.load(arg),
    '.ini': arg => ini.parse(arg),
  };
  return parsers[extension](file);
};

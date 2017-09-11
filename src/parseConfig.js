import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': arg => JSON.parse(arg),
  '.yml': arg => yaml.load(arg),
  '.yaml': arg => yaml.load(arg),
  '.ini': arg => ini.parse(arg),
};

export default (extension, file) => parsers[extension](file);

import commander from 'commander';
import pjson from '../package.json';

const program = commander
  .version(pjson.version)
  .description(pjson.description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format');

export default () => program.parse(process.argv);

import commander from 'commander';
import pjson from '../package.json';
import compare from './compare';

const program = commander
  .version(pjson.version)
  .description(pjson.description)
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = compare(firstConfig, secondConfig);
    console.log(diff);
  })
  .option('-f, --format [type]', 'output format');

export default () => program.parse(process.argv);

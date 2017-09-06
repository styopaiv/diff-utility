import commander from 'commander';
import pjson from '../package.json';
import readFiles from './readFiles';

const program = commander
  .version(pjson.version)
  .description(pjson.description)
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = readFiles(firstConfig, secondConfig);
    console.log(diff);
  })
  .option('-f, --format [type]', 'output format');

export default () => program.parse(process.argv);

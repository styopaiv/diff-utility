import commander from 'commander';
import pjson from '../package.json';
import genDiff from './genDiff';

const program = commander
  .version(pjson.version)
  .description(pjson.description)
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = genDiff(firstConfig, secondConfig);
    console.log(diff);
  })
  .option('-f, --format [type]', 'output format');

export default () => program.parse(process.argv);

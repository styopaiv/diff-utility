import commander from 'commander';
import pjson from '../package.json';
import genDiff from '.';

const program = commander
  .version(pjson.version)
  .description(pjson.description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    const diff = genDiff(firstConfig, secondConfig, program.format);
    console.log(diff);
  });

export default () => program.parse(process.argv);

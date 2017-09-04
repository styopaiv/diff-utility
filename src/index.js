import commander from 'commander';

const program = commander
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format');


export default () => program.parse(process.argv);

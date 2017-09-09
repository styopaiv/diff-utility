import util from 'util';
import _ from 'lodash';

const convertStr = (elem) => {
  const str = _.isObject(elem) ? `${util.inspect(elem).replace(/[']+/g, '')}` : elem;
  return str;
};

export default (ast) => {
  const iter = (obj, counter) => {
    const [addSign, deleteSign] = ['+', '-'];
    const indentation = '  '.repeat(counter);

    const checkType = (arg) => {
      if (arg.type === 'same') {
        return `${indentation}  ${arg.key}: ${convertStr(arg.valueBefore)}`;
      }
      if (arg.type === 'changed') {
        return [`${indentation}${addSign} ${arg.key}: ${convertStr(arg.valueAfter)}`,
          `${indentation}${deleteSign} ${arg.key}: ${convertStr(arg.valueBefore)}`];
      }
      if (arg.type === 'added') {
        return `${indentation}${addSign} ${arg.key}: ${convertStr(arg.valueAfter)}`;
      }
      if (arg.type === 'deleted') {
        return `${indentation}${deleteSign} ${arg.key}: ${convertStr(arg.valueBefore)}`;
      }
      return arg;
    };

    const result = obj.reduce((acc, elem) => {
      if (elem.type !== 'nested') {
        return acc.concat(checkType(elem));
      }
      return acc.concat(` ${indentation} ${elem.key}: {
${iter(elem.children, counter + 2)}
    }`);
    }, []).join('\n');
    return result;
  };
  return `
{
${iter(ast, 1)}
}
`;
};

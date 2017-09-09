import util from 'util';
import _ from 'lodash';

const addSign = '+';
const deleteSign = '-';

export default (ast) => {
  const iter = (obj, counter) => {
    const indentation = '  '.repeat(counter);

    const convertStr = (elem) => {
      const str = _.isObject(elem) ? `{
     ${indentation}${util.inspect(elem).replace(/['"]+/g, '').slice(1, -2)}
  ${indentation}}` : elem;
      return str;
    };

    const types = {
      same: arg => `${indentation}  ${arg.key}: ${convertStr(arg.valueBefore)}`,

      changed: arg => [`${indentation}${addSign} ${arg.key}: ${convertStr(arg.valueAfter)}`,
        `${indentation}${deleteSign} ${arg.key}: ${convertStr(arg.valueBefore)}`],

      added: arg => `${indentation}${addSign} ${arg.key}: ${convertStr(arg.valueAfter)}`,

      deleted: arg => `${indentation}${deleteSign} ${arg.key}: ${convertStr(arg.valueBefore)}`,
    };

    const result = obj.reduce((acc, elem) => {
      if (elem.type !== 'nested') {
        return acc.concat(types[elem.type](elem));
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

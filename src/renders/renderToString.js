import util from 'util';
import _ from 'lodash';

const addSign = '+';
const deleteSign = '-';
const space = ' ';

const convertStr = (elem, indent) => {
  const str = _.isObject(elem) ? `{
     ${indent}${util.inspect(elem).replace(/['"]+/g, '').slice(1, -2)}
  ${indent}}` : elem;
  return str;
};

const checkType = (elem, elemType, indent, children) => {
  const types = {
    nested: () => `${space}${indent} ${elem.key}: {
${children}
    }`,

    same: arg => `${indent}${space} ${arg.key}: ${convertStr(arg.valueBefore, indent)}`,

    changed: arg => [`${indent}${addSign} ${arg.key}: ${convertStr(arg.valueAfter, indent)}`,
      `${indent}${deleteSign} ${arg.key}: ${convertStr(arg.valueBefore)}`],

    added: arg => `${indent}${addSign} ${arg.key}: ${convertStr(arg.valueAfter, indent)}`,

    deleted: arg => `${indent}${deleteSign} ${arg.key}: ${convertStr(arg.valueBefore, indent)}`,
  };
  return types[elemType](elem);
};

export default (ast) => {
  const iter = (obj, counter) => {
    const indent = '  '.repeat(counter);
    const result = obj.reduce((acc, elem) => {
      const children = iter(elem.children, counter + 2);
      return acc.concat(checkType(elem, elem.type, indent, children));
    }, []).join('\n');
    return result;
  };
  return `
{
${iter(ast, 1)}
}
`;
};

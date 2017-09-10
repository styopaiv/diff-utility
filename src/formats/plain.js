import _ from 'lodash';

const checkValue = (value) => {
  const str = _.isObject(value) ? 'complex value' : `value: ${value}`;
  return str;
};

const getKey = (item, elemKey) => {
  const key = elemKey !== '' ? `${elemKey}.${item.key}` : item.key;
  return key;
};

const renderPlain = (ast) => {
  const iter = (obj, nestedKey) => {
    const result = obj.reduce((acc, elem) => {
      const types = {
        same: arg => `Property '${getKey(arg, nestedKey)}' didn't change.`,

        changed: arg => `Property '${getKey(arg, nestedKey)}' was updated. From '${arg.valueBefore}' to '${arg.valueAfter}'`,

        added: arg => `Property '${getKey(arg, nestedKey)}' was added with ${checkValue(arg.valueAfter)}`,

        deleted: arg => `Property '${getKey(arg, nestedKey)}' was removed`,
      };
      if (elem.type !== 'nested') {
        return acc.concat(types[elem.type](elem));
      }
      return acc.concat(`${iter(elem.children, elem.key)}`);
    }, []).join('\n');

    return result;
  };
  return iter(ast, '');
};

export default renderPlain;

import _ from 'lodash';

const checkValue = (value) => {
  const str = _.isObject(value) ? 'complex value' : `value: ${value}`;
  return str;
};

const getKey = (item, elemKey) => {
  const key = elemKey !== '' ? `${elemKey}.${item.key}` : item.key;
  return key;
};

const checkType = (elemType, elem, nestedKey, children) => {
  const types = {
    nested: () => `${children}`,

    same: arg => `Property '${getKey(arg, nestedKey)}' didn't change.`,

    changed: arg => `Property '${getKey(arg, nestedKey)}' was updated. From '${arg.valueBefore}' to '${arg.valueAfter}'`,

    added: arg => `Property '${getKey(arg, nestedKey)}' was added with ${checkValue(arg.valueAfter)}`,

    deleted: arg => `Property '${getKey(arg, nestedKey)}' was removed`,
  };
  return types[elemType](elem);
};

export default (ast) => {
  const iter = (obj, nestedKey) => {
    const result = obj.reduce((acc, elem) => {
      const children = iter(elem.children, elem.key);
      return acc.concat(checkType(elem.type, elem, nestedKey, children));
    }, []).join('\n');

    return result;
  };
  return iter(ast, '');
};

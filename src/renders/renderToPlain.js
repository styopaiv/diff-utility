import _ from 'lodash';

const checkValue = (value) => {
  const str = _.isObject(value) ? 'complex value' : `value: ${value}`;
  return str;
};

const checkType = (elemType, elem, children, path) => {
  const types = {
    nested: () => `${children}`,

    unchanged: () => '',

    changed: arg => `Property '${path.join('.')}' was updated. From '${arg.valueBefore}' to '${arg.valueAfter}'`,

    added: arg => `Property '${path.join('.')}' was added with ${checkValue(arg.valueAfter)}`,

    deleted: () => `Property '${path.join('.')}' was removed`,
  };
  return types[elemType](elem);
};

const getPath = (arg, arr) => {
  const key = arg.type === 'nested' ? arr.concat(arg.key) : [].concat(arr, arg.key);
  return key;
};

export default (ast) => {
  const iter = (obj, keysArr) => {
    const result = obj.reduce((acc, elem) => {
      const path = getPath(elem, keysArr);
      const children = elem.type === 'nested' ? iter(elem.children, path) : '';
      return acc.concat(checkType(elem.type, elem, children, path));
    }, []).filter(item => item !== '').join('\n');
    return result;
  };
  return iter(ast, []);
};

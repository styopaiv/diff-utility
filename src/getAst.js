import _ from 'lodash';

const getAst = (beforeObj, afterObj) => {
  const beforeKeys = Object.keys(beforeObj);
  const afterKeys = Object.keys(afterObj);
  const combinedKeys = _.union(beforeKeys, afterKeys);

  const types = [
    {
      type: 'nested',
      check: arg => _.isObject(beforeObj[arg]) && _.isObject(afterObj[arg]),
    },
    {
      type: 'same',
      check: arg => _.has(beforeObj, arg)
      && _.has(afterObj, arg)
      && beforeObj[arg] === afterObj[arg],
    },
    {
      type: 'added',
      check: arg => !_.has(beforeObj, arg) && _.has(afterObj, arg),
    },
    {
      type: 'deleted',
      check: arg => _.has(beforeObj, arg) && !_.has(afterObj, arg),
    },
    {
      type: 'changed',
      check: arg => _.has(beforeObj, arg)
      && _.has(afterObj, arg)
      && beforeObj[arg] !== afterObj[arg],
    },
  ];

  const getType = arg => _.find(types, ({ check }) => check(arg));

  const result = combinedKeys.reduce((acc, key) => {
    const { type } = getType(key);
    const valueBefore = beforeObj[key];
    const valueAfter = afterObj[key];

    const children = type === 'nested' ? getAst(beforeObj[key], afterObj[key]) : [];

    return acc.concat({
      key, type, valueBefore, valueAfter, children,
    });
  }, []);
  return result;
};

export default getAst;

import _ from 'lodash';

const getAst = (beforeObj, afterObj) => {
  const beforeKeys = Object.keys(beforeObj);
  const afterKeys = Object.keys(afterObj);
  const combinedKeys = _.union(beforeKeys, afterKeys);

  const result = combinedKeys.reduce((acc, elem) => {
    const includesBefore = beforeKeys.includes(elem);
    const includesAfter = afterKeys.includes(elem);

    const types = [
      {
        type: 'same',
        check: () => includesBefore && includesAfter && beforeObj[elem] === afterObj[elem],
      },
      {
        type: 'added',
        check: () => !includesBefore && includesAfter,
      },
      {
        type: 'deleted',
        check: () => includesBefore && !includesAfter,
      },
      {
        type: 'changed',
        check: () => includesBefore && includesAfter && beforeObj[elem] !== afterObj[elem],
      },
    ];

    const getType = arg => _.find(types, ({ check }) => check(arg));

    const { type } = getType(elem);

    const valueBefore = beforeObj[elem] === undefined ? 'no value' : beforeObj[elem];
    const valueAfter = afterObj[elem] === undefined ? 'no value' : afterObj[elem];

    if (type !== 'deleted' && type !== 'added') {
      if (beforeObj[elem] instanceof Object || afterObj[elem] instanceof Object) {
        return acc.concat({
          name: elem, nodeType: '', children: getAst(beforeObj[elem], afterObj[elem]),
        });
      }
    }
    return acc.concat({
      name: elem, nodeType: type, valueBefore, valueAfter, children: [],
    });
  }, []);
  return result;
};

export default getAst;

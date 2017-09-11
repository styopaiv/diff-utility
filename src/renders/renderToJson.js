export default (ast) => {
  const result = ast.reduce((acc, elem) => {
    const obj = {
      ...acc,
      [elem.key]: {
        type: elem.type,
        valueBefore: elem.valueBefore,
        ValueAfter: elem.valueAfter,
        children: elem.children,
      },
    };
    return obj;
  }, {});
  return JSON.stringify(result, null, 2);
};

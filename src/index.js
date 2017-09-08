import getAst from './getAst';

export default (beforeObj, afterObj) => {
  const ast = getAst(beforeObj, afterObj);
  console.log(ast);
  const result = ast.reduce((acc, elem) => {
    if (elem.children.length === 0 && elem.type === 'deleted') {
      return acc.concat(`  - ${elem.key}: ${elem.valueBefore}`);
    }
    if (elem.children.length === 0 && elem.type === 'added') {
      return acc.concat(`  + ${elem.key}: ${elem.valueAfter}`);
    }
    if (elem.children.length === 0 && elem.type === 'same') {
      return acc.concat(`    ${elem.key}: ${elem.valueAfter}`);
    }
    if (elem.children.length === 0 && elem.type === 'changed') {
      return acc.concat(`  + ${elem.key}: ${elem.valueAfter}`, `  - ${elem.key}: ${elem.valueBefore}`);
    }

    if (elem.children.length > 0) {
      const childrenMap = elem.children.reduce((acc2, child) => {
        if (child.type === 'same') {
          return acc2.concat(`        ${child.key}: ${child.valueBefore}`);
        }
        if (child.type === 'changed') {
          return acc2.concat(`      + ${child.key}: ${child.valueAfter}`, `      - ${child.key}: ${child.valueBefore}`);
        }
        if (child.type === 'added') {
          return acc2.concat(`      + ${child.key}: ${child.valueAfter}`);
        }
        if (child.type === 'deleted') {
          return acc2.concat(`      - ${child.key}: ${child.valueBefore}`);
        }

        return acc2;
      }, []).join('\n');
      return acc.concat(`    ${elem.key}: {
${childrenMap}
    }`);
    }
    return acc;
  }, []).join('\n');
  return `
{
${result}
}`;
};

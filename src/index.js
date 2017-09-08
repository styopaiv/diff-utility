import getAst from './getAst';

export default (beforeObj, afterObj) => {
  const ast = getAst(beforeObj, afterObj);

  const result = ast.reduce((acc, elem) => {
    if (elem.children.length === 0 && elem.nodeType === 'deleted') {
      return acc.concat(`  - ${elem.name}: ${elem.valueBefore}`);
    }
    if (elem.children.length === 0 && elem.nodeType === 'added') {
      return acc.concat(`  + ${elem.name}: ${elem.valueAfter}`);
    }
    if (elem.children.length === 0 && elem.nodeType === 'same') {
      return acc.concat(`    ${elem.name}: ${elem.valueAfter}`);
    }
    if (elem.children.length === 0 && elem.nodeType === 'changed') {
      return acc.concat(`  + ${elem.name}: ${elem.valueAfter}`, `  - ${elem.name}: ${elem.valueBefore}`);
    }

    if (elem.children.length > 0) {
      const childrenMap = elem.children.reduce((acc2, child) => {
        if (child.nodeType === 'same') {
          return acc2.concat(`        ${child.name}: ${child.valueBefore}`);
        }
        if (child.nodeType === 'changed') {
          return acc2.concat(`      + ${child.name}: ${child.valueAfter}`, `      - ${child.name}: ${child.valueBefore}`);
        }
        if (child.nodeType === 'added') {
          return acc2.concat(`      + ${child.name}: ${child.valueAfter}`);
        }
        if (child.nodeType === 'deleted') {
          return acc2.concat(`      - ${child.name}: ${child.valueBefore}`);
        }

        return acc2;
      }, []).join('\n');
      return acc.concat(`    ${elem.name}: {
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

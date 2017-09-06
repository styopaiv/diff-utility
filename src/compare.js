import fs from 'fs';
import _ from 'lodash';

export default (firstPath, secondPath) => {
  const firstFile = fs.readFileSync(firstPath);
  const secondFile = fs.readFileSync(secondPath);

  const beforeObj = JSON.parse(firstFile);
  const afterObj = JSON.parse(secondFile);

  const beforeKeys = Object.keys(beforeObj);
  const afterKeys = Object.keys(afterObj);
  const combinedKeys = _.uniq(beforeKeys.concat(afterKeys));

  const result = combinedKeys.reduce((acc, elem) => {
    const includesBefore = beforeKeys.includes(elem);
    const includesAfter = afterKeys.includes(elem);

    if (includesBefore && includesAfter && beforeObj[elem] === afterObj[elem]) {
      acc.push(`    ${elem}: ${beforeObj[elem]}`);
    }
    if (includesBefore && !includesAfter) {
      acc.push(`  - ${elem}: ${beforeObj[elem]}`);
    }
    if (!includesBefore && includesAfter) {
      acc.push(`  + ${elem}: ${afterObj[elem]}`);
    }
    if (includesBefore && includesAfter && beforeObj[elem] !== afterObj[elem]) {
      acc.push(`  + ${elem}: ${afterObj[elem]}`);
      acc.push(`  - ${elem}: ${beforeObj[elem]}`);
    }
    return acc;
  }, []).join('\n');
  return `
{
${result}
}`;
};

import _ from 'lodash';
import parseConfig from './parseConfig';
import readFiles from './readFiles';

export default (firstPath, secondPath) => {
  const [firstFile, secondFile] = readFiles(firstPath, secondPath);
  const [beforeObj, afterObj] = parseConfig(firstPath, firstFile, secondFile);

  const beforeKeys = Object.keys(beforeObj);
  const afterKeys = Object.keys(afterObj);
  const combinedKeys = _.union(beforeKeys, afterKeys);

  const result = combinedKeys.reduce((acc, elem) => {
    const includesBefore = beforeKeys.includes(elem);
    const includesAfter = afterKeys.includes(elem);

    if (includesBefore && includesAfter && beforeObj[elem] === afterObj[elem]) {
      return acc.concat(`    ${elem}: ${beforeObj[elem]}`);
    }
    if (includesBefore && !includesAfter) {
      return acc.concat(`  - ${elem}: ${beforeObj[elem]}`);
    }
    if (!includesBefore && includesAfter) {
      return acc.concat(`  + ${elem}: ${afterObj[elem]}`);
    }
    if (includesBefore && includesAfter && beforeObj[elem] !== afterObj[elem]) {
      return acc.concat(`  + ${elem}: ${afterObj[elem]}`, `  - ${elem}: ${beforeObj[elem]}`);
    }
    return acc;
  }, []).join('\n');
  return `
{
${result}
}`;
};

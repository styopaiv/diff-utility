import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

export default (firstPath, secondPath) => {
  const firstFile = fs.readFileSync(firstPath);
  const secondFile = fs.readFileSync(secondPath);

  const extension = path.extname(firstPath);

  let beforeObj;
  let afterObj;

  if (extension === '.json') {
    beforeObj = JSON.parse(firstFile);
    afterObj = JSON.parse(secondFile);
  } else if (extension === '.yml') {
    beforeObj = yaml.load(fs.readFileSync(firstPath, { encoding: 'utf-8' }));
    afterObj = yaml.load(fs.readFileSync(secondPath, { encoding: 'utf-8' }));
  }

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

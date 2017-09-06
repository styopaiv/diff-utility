import fs from 'fs';

export default (firstPath, secondPath) => {
  const firstFile = fs.readFileSync(firstPath, 'utf-8');
  const secondFile = fs.readFileSync(secondPath, 'utf-8');

  return [firstFile, secondFile];
};

import fs from 'fs';

export default (firstPath, secondPath) => {
  const firstFile = fs.readFileSync(firstPath);
  const secondFile = fs.readFileSync(secondPath);

  return [firstFile, secondFile];
};

import fs from 'fs';
import path from 'path';
import getAst from './getAst';
import parseConfig from './parseConfig';
import render from './render';

export default (firstPath, secondPath) => {
  const firstFile = fs.readFileSync(firstPath, 'utf-8');
  const secondFile = fs.readFileSync(secondPath, 'utf-8');
  const extension = path.extname(firstPath);
  const beforeObj = parseConfig(extension, firstFile);
  const afterObj = parseConfig(extension, secondFile);
  const ast = getAst(beforeObj, afterObj);

  return render(ast);
};

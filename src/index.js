import fs from 'fs';
import path from 'path';
import buildAst from './buildAst';
import parseConfig from './parseConfig';
import render from './renders/';

export default (firstPath, secondPath, format) => {
  const firstFile = fs.readFileSync(firstPath, 'utf-8');
  const secondFile = fs.readFileSync(secondPath, 'utf-8');
  const extension = path.extname(firstPath);
  const beforeObj = parseConfig(extension, firstFile);
  const afterObj = parseConfig(extension, secondFile);
  const ast = buildAst(beforeObj, afterObj);

  return render(ast, format);
};

import parseConfig from './parseConfig';
import readFiles from './readFiles';

export default (firstPath, secondPath) => {
  const [extension, firstFile, secondFile] = readFiles(firstPath, secondPath);

  return parseConfig(extension, firstFile, secondFile);
};

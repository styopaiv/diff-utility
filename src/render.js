import renderToPlain from './formats/plain';
import renderToString from './formats/string';

export default (ast, format) => {
  const formats = {
    string: renderToString,
    plain: renderToPlain,
  };
  return formats[format](ast);
};

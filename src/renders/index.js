import renderToString from './renderToString';
import renderToPlain from './renderToPlain';

export default (ast, format) => {
  const formats = {
    string: renderToString,
    plain: renderToPlain,
  };
  return formats[format](ast);
};

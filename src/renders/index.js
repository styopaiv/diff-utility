import renderToString from './renderToString';
import renderToPlain from './renderToPlain';
import renderToJson from './renderToJson';

const formats = {
  string: renderToString,
  plain: renderToPlain,
  json: renderToJson,
};

export default (ast, format) => formats[format](ast);

export default ast => `{${JSON.stringify(ast, null, 2).slice(1, -1)}}`;

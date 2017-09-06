import compare from '../src/compare';

const firstPath = './files/before.json';
const secondPath = './files/after.json';

const result = `
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('compares files', () => {
  expect(compare(firstPath, secondPath)).toBe(result);
});

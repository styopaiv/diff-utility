import compare from '../src/compare';

const result = `
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('compares json', () => {
  const firstPath = './files/json/before.json';
  const secondPath = './files/json/after.json';
  expect(compare(firstPath, secondPath)).toBe(result);
});

test('compares yaml', () => {
  const firstPath = './files/yml/before.yml';
  const secondPath = './files/yml/after.yml';
  expect(compare(firstPath, secondPath)).toBe(result);
});

import readFiles from '../src/readFiles';

const result = `
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('compares json', () => {
  const firstPath = './__tests__/__fixtures__/json/before.json';
  const secondPath = './__tests__/__fixtures__/json/after.json';
  expect(readFiles(firstPath, secondPath)).toBe(result);
});

test('compares yaml', () => {
  const firstPath = './__tests__/__fixtures__/yml/before.yml';
  const secondPath = './__tests__/__fixtures__/yml/after.yml';
  expect(readFiles(firstPath, secondPath)).toBe(result);
});

test('compares ini', () => {
  const firstPath = './__tests__/__fixtures__/ini/before.ini';
  const secondPath = './__tests__/__fixtures__/ini/after.ini';
  expect(readFiles(firstPath, secondPath)).toBe(result);
});

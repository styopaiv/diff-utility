import fs from 'fs';
import compare from '../src/compare';

const firstFile = fs.readFileSync('./files/first.json');
const secondFile = fs.readFileSync('./files/second.json');

const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('compares files', () => {
  expect(compare(firstFile, secondFile)).toBe(result);
});

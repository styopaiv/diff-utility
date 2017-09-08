import genDiff from '../src/genDiff';

const result = `
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

const treeResult = `
{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

test('compares json', () => {
  const firstPath = './__tests__/__fixtures__/json/before.json';
  const secondPath = './__tests__/__fixtures__/json/after.json';
  expect(genDiff(firstPath, secondPath)).toBe(result);
});

test('compares yaml', () => {
  const firstPath = './__tests__/__fixtures__/yml/before.yml';
  const secondPath = './__tests__/__fixtures__/yml/after.yml';
  expect(genDiff(firstPath, secondPath)).toBe(result);
});

test('compares ini', () => {
  const firstPath = './__tests__/__fixtures__/ini/before.ini';
  const secondPath = './__tests__/__fixtures__/ini/after.ini';
  expect(genDiff(firstPath, secondPath)).toBe(result);
});

test('compares tree json', () => {
  const firstPath = './__tests__/__fixtures__/json/treeBefore.json';
  const secondPath = './__tests__/__fixtures__/json/treeAfter.json';
  expect(genDiff(firstPath, secondPath)).toBe(treeResult);
});

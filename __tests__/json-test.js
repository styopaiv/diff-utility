import genDiff from '../src';

const result = `{
  "host": {
    "type": "unchanged",
    "valueBefore": "hexlet.io",
    "ValueAfter": "hexlet.io",
    "children": []
  },
  "timeout": {
    "type": "changed",
    "valueBefore": "50",
    "ValueAfter": "20",
    "children": []
  },
  "proxy": {
    "type": "deleted",
    "valueBefore": "123.234.53.22",
    "children": []
  },
  "verbose": {
    "type": "added",
    "ValueAfter": "true",
    "children": []
  }
}`;

test('compares simple json', () => {
  const firstPath = './__tests__/__fixtures__/json/before.json';
  const secondPath = './__tests__/__fixtures__/json/after.json';
  expect(genDiff(firstPath, secondPath, 'json')).toBe(result);
});

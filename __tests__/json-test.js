import genDiff from '../src';

const result = `{
  {
    "key": "host",
    "type": "unchanged",
    "valueBefore": "hexlet.io",
    "valueAfter": "hexlet.io",
    "children": []
  },
  {
    "key": "timeout",
    "type": "changed",
    "valueBefore": "50",
    "valueAfter": "20",
    "children": []
  },
  {
    "key": "proxy",
    "type": "deleted",
    "valueBefore": "123.234.53.22",
    "children": []
  },
  {
    "key": "verbose",
    "type": "added",
    "valueAfter": "true",
    "children": []
  }
}`;

test('compares simple json', () => {
  const firstPath = './__tests__/__fixtures__/json/before.json';
  const secondPath = './__tests__/__fixtures__/json/after.json';
  expect(genDiff(firstPath, secondPath, 'json')).toBe(result);
});

import genDiff from '../src';

const result = `Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed
Property 'verbose' was added with value: true`;

const treeResult = `Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value`;

const deepTreeResult = `Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting7.qwert' was removed
Property 'common.setting7.key' was added with complex value
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value`;

test('compares simple json', () => {
  const firstPath = './__tests__/__fixtures__/json/before.json';
  const secondPath = './__tests__/__fixtures__/json/after.json';
  expect(genDiff(firstPath, secondPath, 'plain')).toBe(result);
});

test('compares simple yaml', () => {
  const firstPath = './__tests__/__fixtures__/yml/before.yml';
  const secondPath = './__tests__/__fixtures__/yml/after.yml';
  expect(genDiff(firstPath, secondPath, 'plain')).toBe(result);
});

test('compares simple ini', () => {
  const firstPath = './__tests__/__fixtures__/ini/before.ini';
  const secondPath = './__tests__/__fixtures__/ini/after.ini';
  expect(genDiff(firstPath, secondPath, 'plain')).toBe(result);
});

test('compares nested json', () => {
  const firstPath = './__tests__/__fixtures__/json/treeBefore.json';
  const secondPath = './__tests__/__fixtures__/json/treeAfter.json';
  expect(genDiff(firstPath, secondPath, 'plain')).toBe(deepTreeResult);
});

test('compares nested yaml', () => {
  const firstPath = './__tests__/__fixtures__/yml/treeBefore.yml';
  const secondPath = './__tests__/__fixtures__/yml/treeAfter.yml';
  expect(genDiff(firstPath, secondPath, 'plain')).toBe(treeResult);
});

test('compares nested ini', () => {
  const firstPath = './__tests__/__fixtures__/ini/treeBefore.ini';
  const secondPath = './__tests__/__fixtures__/ini/treeAfter.ini';
  expect(genDiff(firstPath, secondPath, 'plain')).toBe(treeResult);
});

install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

publish:
	npm publish

lint:
	npm run eslint ./src

test:
	npm run test

watch:
	npm run test -- --watch

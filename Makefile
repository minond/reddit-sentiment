all: lint test

clean:
	rm -r tests/src

install:
	pip install -r requirements.txt
	npm install

lint:
	pep8 src/*.py tests/*.py *.py
	node_modules/.bin/jshint static/js/*.js

test:
	touch tests/src
	rm -r tests/src
	cp -r src tests/src
	python tests/sentiment.py

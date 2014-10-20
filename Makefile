all: lint test

install:
	pip install -r requirements.txt

lint:
	pep8 src/*.py tests/*.py *.py
	jshint static/js/*.js

test:
	touch tests/src
	rm -r tests/src
	cp -r src tests/src
	python tests/sentiment.py

all: lint test

install:
	pip install -r requirements.txt
	npm install

lint:
	pep8 reddiment
	node_modules/.bin/jshint static/js/*.js

test:
	trial reddiment
	rm -r _trial_temp

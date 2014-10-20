install:
	pip install -r requirements.txt

lint:
	pep8 src/*.py *.py
	jshint static/js/*.js

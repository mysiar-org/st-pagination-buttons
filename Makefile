venv::
	python -m venv venv
	. venv/bin/activate && pip install -U pip

install::
	. venv/bin/activate && pip install streamlit setuptools twine
	. venv/bin/activate && pip install -e .
	cd pagination_buttons/frontend && npm install

run::
	cd pagination_buttons/frontend && npm start &
	. venv/bin/activate && _ST_PAGINATION_BUTTONS_NOT_RELEASE_=1 streamlit run pagination_buttons/example.py

run-front::
	cd pagination_buttons/frontend && npm start &

run-st::
	. venv/bin/activate && _ST_PAGINATION_BUTTONS_NOT_RELEASE_=1 streamlit run pagination_buttons/example.py


build::
	rm -rf build dist
	rm -rf pagination_buttons/frontend/build
	cd pagination_buttons/frontend && npm run build
	. venv/bin/activate && python setup.py sdist bdist_wheel

test::
	. venv/bin/activate && cd tests && pip install -U -r req.txt && streamlit run test_app.py


upload-test::
	. venv/bin/activate && python -m twine upload -u $${PYPI_USER} -p $${PYPI_PASS_TEST} --verbose --repository testpypi dist/*

upload::
	. venv/bin/activate && python -m twine upload -u $${PYPI_USER} -p $${PYPI_PASS} --verbose dist/*


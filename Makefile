venv::
	python -m venv venv
	. venv/bin/activate && pip install -U pip

install::
	. venv/bin/activate && pip install streamlit setuptools twine wheel
	. venv/bin/activate && pip install -e .
	cd st_pagination_buttons/frontend && npm install

run::
	cd st_pagination_buttons/frontend && npm start &
	. venv/bin/activate && _ST_PAGINATION_BUTTONS_NOT_RELEASE_=1 streamlit run st_pagination_buttons/example.py

run-front::
	cd st_pagination_buttons/frontend && npm start &

run-st::
	. venv/bin/activate && _ST_PAGINATION_BUTTONS_NOT_RELEASE_=1 streamlit run st_pagination_buttons/example.py


build::
	rm -rf build dist
	rm -rf st_pagination_buttons/frontend/build
	mkdir -p st_pagination_buttons/frontend/build
	cd st_pagination_buttons/frontend && npm run build
	touch st_pagination_buttons/frontend/build/bootstrap.min.css.map
	. venv/bin/activate && python setup.py sdist bdist_wheel

test::
	cd tests && make test

upload-test::
	. venv/bin/activate && python -m twine upload -u $${PYPI_USER} -p $${PYPI_PASS_TEST} --verbose --repository testpypi dist/*

upload::
	. venv/bin/activate && python -m twine upload -u $${PYPI_USER} -p $${PYPI_PASS} --verbose dist/*


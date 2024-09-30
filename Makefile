venv::
	python -m venv venv
	. venv/bin/activate && pip install -U pip

install::
	. venv/bin/activate && pip install streamlit setuptools
	. venv/bin/activate && pip install -e .
	cd pagination_buttons/frontend && npm install

run::
	cd pagination_buttons/frontend && npm start &
	. venv/bin/activate && streamlit run pagination_buttons/example.py

run-front::
	cd pagination_buttons/frontend && npm start &

run-st::
	. venv/bin/activate && streamlit run pagination_buttons/example.py


build::
	rm -rf build dist
	rm -rf pagination_buttons/frontend/build
	cd pagination_buttons/frontend && npm run build
	python setup.py sdist bdist_wheel
web: gunicorn --pythonpath="$PWD/timemapper-cms" wsgi:application
worker: python timemapper-cms/manage.py rqworker default

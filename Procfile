web: newrelic-admin run-program gunicorn --pythonpath="$PWD/timemapper-cms" wsgi:application
worker: python timemapper-cms/manage.py rqworker default
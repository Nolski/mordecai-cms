FROM nikolaik/python-nodejs:latest
ENV PYTHONUNBUFFERED 1

# Allows docker to cache installed dependencies between builds
COPY ./requirements.txt /requirements.txt
COPY ./requirements /requirements
RUN pip install -r /requirements.txt

# Adds our application code to the image
COPY . /code/
WORKDIR /code/cms-app/

RUN yarn

WORKDIR /code

EXPOSE 8000

# Migrates the database, uploads staticfiles, and runs the production server
CMD ./manage.py migrate && \
    ./manage.py collectstatic --noinput && \
    newrelic-admin run-program gunicorn --bind 0.0.0.0:$PORT --access-logfile - {{cookiecutter.app_name}}.wsgi:application

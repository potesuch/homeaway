#!/bin/bash
python manage.py migrate;
python manage.py collectstatic --noinput;
gunicorn homeaway.wsgi:application --bind 0:8000 &
daphne -b 0.0.0.0 -p 8001 homeaway.asgi:application;

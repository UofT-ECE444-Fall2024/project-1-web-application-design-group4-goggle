#!/bin/bash
# Run migrations and collect static files
python manage.py makemigrations
python manage.py migrate
# python manage.py collectstatic --noinput

# Start gunicorn with application
exec gunicorn uoftrade.wsgi:application --bind 0.0.0.0:8000

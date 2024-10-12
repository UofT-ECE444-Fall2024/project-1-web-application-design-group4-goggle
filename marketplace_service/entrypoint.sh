#!/bin/bash
# Run migrations and collect static files
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput

# Start gunicorn with your application
exec gunicorn marketplace_service.wsgi:application --bind 0.0.0.0:12001

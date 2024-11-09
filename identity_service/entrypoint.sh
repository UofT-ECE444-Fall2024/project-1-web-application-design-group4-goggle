#!/bin/bash

# Run migrations and collect static files
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
python -m celery -q -A identity_service worker -Q identity_service --loglevel=WARNING &

# Run tests
python manage.py test --verbosity=2
if [ $? -ne 0 ]; then
    echo "Tests failed. Exiting..."
    exit 1
fi

# Start gunicorn with your application
exec gunicorn identity_service.wsgi:application --bind 0.0.0.0:12000
# Dockerfile
# Use the official Python image as the base image
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files into the container
COPY . /app/

# Give execute permissions to the entrypoint script
RUN chmod +x /app/entrypoint.sh

# Define the entrypoint script as the command to run on container start
ENTRYPOINT ["/app/entrypoint.sh"]
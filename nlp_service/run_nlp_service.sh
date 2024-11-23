#! /bin/bash

echo "Running NLP Service"

gunicorn -w 4 -b $NLP_SERVICE_HOST:8000 nlp_service:wsgi

exit 0
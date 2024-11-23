#! /bin/bash

echo "Running Assistant Service"

gunicorn -w 4 -b $ASSISTANT_SERVCICE_HOST:5001 assistant_service:app

exit 0
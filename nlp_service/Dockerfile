FROM python:3.12-slim

WORKDIR /opt/app

# COPY nlp_service/requirements.txt requirements.txt
COPY nlp_service /opt/app

RUN apt update && apt upgrade
RUN pip install -r requirements.txt
RUN python -m spacy download es_core_news_sm
RUN chmod +x /opt/app/*.sh

EXPOSE 8000

# CMD ["/opt/app/run_nlp_service.sh"]
CMD python /opt/app/manage.py runserver 0.0.0.0:8000
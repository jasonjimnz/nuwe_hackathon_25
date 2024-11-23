FROM python:3.12-slim

WORKDIR /opt/app

COPY nlp_service/requirements.txt requirements.txt
COPY nlp_service/* .

RUN apt update && apt upgrade
RUN pip install -r requirements.txt
RUN python -m spacy download es_core_news_sm
RUN chmod +x /opt/app/*.sh

EXPOSE 8000

CMD ["/opt/app/run_nlp_service.sh"]
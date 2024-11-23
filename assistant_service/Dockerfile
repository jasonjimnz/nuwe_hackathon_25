FROM python:3.12-slim

WORKDIR /opt/app

COPY assistant_service/requirements.txt requirements.txt
COPY assistant_service/* .
COPY assistant_service/templates /opt/app/templates
COPY ${LLM_MODEL_PATH} /opt/models/${LLM_MODEL_FILE}

RUN apt update && apt upgrade
RUN apt install -y python3-dev gcc g++ make jq
RUN pip install -r requirements.txt
RUN chmod +x /opt/app/*.sh

EXPOSE 5001

ENV LLM_MODEL_PATH=/opt/models/${LLM_MODEL_FILE}

CMD ["/opt/app/run_assistant_service.sh"]
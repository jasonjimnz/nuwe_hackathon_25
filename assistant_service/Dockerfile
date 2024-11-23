FROM python:3.12-slim

WORKDIR /opt/app

COPY assistant_service/requirements.txt requirements.txt
COPY assistant_service/ .
COPY ${LLM_MODEL_PATH} /opt/models/${LLM_MODEL_FILE}

RUN sudo apt update && sudo apt upgrade
RUN pip install -r requirements.txt
RUN chmod +x /opt/app/*.sh

EXPOSE 5001

ENV LLM_MODEL_PATH=/opt/models/${LLM_MODEL_FILE}


CMD ["/opt/app/run_assistant_service.sh"]
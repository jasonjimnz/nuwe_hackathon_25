FROM python:3.12-slim

WORKDIR /opt/app

COPY assistant_service/requirements.txt requirements.txt
COPY assistant_service/* .
COPY assistant_service/templates /opt/app/templates
COPY Llama-3.2-1B-Instruct-Q4_K_M.gguf /opt/models/Llama-3.2-1B-Instruct-Q4_K_M.gguf

RUN apt update && apt upgrade
RUN apt install -y python3-dev gcc g++ make jq
RUN pip install -r requirements.txt
RUN chmod +x /opt/app/*.sh

EXPOSE 5001

ENV LLM_MODEL_PATH=/opt/models/Llama-3.2-1B-Instruct-Q4_K_M.gguf

RUN echo ${LLM_MODEL_PATH}

# CMD ["/opt/app/run_assistant_service.sh"]
CMD gunicorn -w 4 -b ${ASSISTANT_SERVCICE_HOST}:5001 assistant_service:app
FROM python:3.12-slim

WORKDIR /opt/app

COPY assistant_service/requirements.txt requirements.txt
COPY assistant_service/ .

RUN sudo apt update && sudo apt upgrade
RUN pip install -r requirements.txt

EXPOSE 5001

CMD ["/opt/app/run_assistant_service.sh"]
FROM python:3.10-slim
RUN mkdir /app
COPY requirements.txt /app
RUN pip3 install -r /app/requirements.txt --no-cache-dir
COPY . /app
WORKDIR /app
RUN chmod +x run_app.sh
ENTRYPOINT ["/app/run_app.sh"]

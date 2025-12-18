# docker build -t flask-app .

FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 8000

CMD ["gunicorn", "-w", "3", "-b", "0.0.0.0:8000", "app:app"]

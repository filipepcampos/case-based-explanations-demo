FROM python:3.10

WORKDIR /src

COPY ./requirements.txt /src/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt

COPY ./data /src/data

COPY ./app /src/app

CMD ["fastapi", "run", "app/main.py", "--port", "80"]

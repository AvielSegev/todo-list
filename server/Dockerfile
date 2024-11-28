

FROM ubuntu:24.04

COPY . /server

WORKDIR /server

RUN apt-get update && apt-get install -y \
    net-tools \
    nodejs \
    npm \
    iputils-ping \
    telnet \
    && apt-get clean

RUN npm install

CMD ["node", "app.js"]

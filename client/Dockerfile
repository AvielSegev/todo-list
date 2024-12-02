FROM ubuntu:24.04

COPY . /client

WORKDIR /client

RUN apt-get update && apt-get install -y \
    net-tools \
    nodejs \
    npm \
    iputils-ping \
    telnet \
    && apt-get clean

RUN npm install

CMD ["npm", "start"]

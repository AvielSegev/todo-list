FROM ubuntu:22.04

# Install Node.js
RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm

# Copy the client code
COPY ./src /client/src
COPY ./public /client/public
COPY ./package.json /client/package.json
COPY ./package-lock.json /client/package-lock.json

# Set the working directory
WORKDIR /client

# Install the dependencies
RUN npm install

# Start the client
CMD ["npm", "start"]

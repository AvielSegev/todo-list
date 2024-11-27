FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip

# Copy the client-cli code
COPY . /client

# Set the working directory
WORKDIR /client

# Install the client-cli
RUN pip3 install .

# Run the client-cli
CMD ["client.py"]

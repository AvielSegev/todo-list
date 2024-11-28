# Start with the base Ubuntu image
FROM ubuntu:22.04

# Install necessary system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    net-tools \
    && apt install -y iputils-ping \
    telnet \
    && apt-get clean 

# Copy the client-cli code into the container
COPY . /client

# Set the working directory
WORKDIR /client

# Install the Python client dependencies
RUN pip3 install --no-cache-dir -r /client/requirements.txt

# Set the default command to run the Python client
CMD ["python3", "client.py"]

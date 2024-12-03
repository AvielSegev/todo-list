# ToDo

## Overview:
A simple and efficient ToDo application designed to help users manage tasks, set priorities, and track progress.

**For updates and progress during the development of this project, please refer to the Wiki: [work progress](https://github.com/AvielSegev/todo-list/wiki/Work-Progress)**

**Explainion of the different approaches: [Different approaches explainion](https://github.com/AvielSegev/todo-list/wiki/Explain-of-the-two-approaches)**

## Instructions to Deploy on a Kubernetes Cluster:

### Directory Structure:

In the root directory of the repository, you will find the following folders:

frontend: Contains the source code for the frontend, including a Node.js server that serves a React application. The application is built and served on requests to /.

server: Hosts the backend code, which manages the ToDo items. It responds to RESTful API calls.

### Workflow Overview:

The user performs an operation in the app.
This triggers an API call to the frontend.
The frontend forwards the request to the backend via another API call.
The backend processes the request and sends a response to the frontend.
The frontend displays the result to the user.

## Deployment Steps:

### 1. Clone the Repository:

git clone <repository_url>

cd <repository_name>

### 2. (Optional) Build Docker Images:

Alternatively you can make use of my public images.

Build the images for the frontend and backend using the Dockerfiles located in the respective directories (frontend and server):

docker build -t <YOUR_IMAGE_NAME> ./frontend

docker build -t <YOUR_IMAGE_NAME> ./server

Update the deployment.yaml files in both frontend and server directories to use your custom image name:

spec:
  template:
    spec:
      containers:
        - image: <YOUR_IMAGE_NAME>
        
### 3. Apply Deployments and Services:

Navigate to each directory (frontend and server) and apply the Kubernetes manifests:

kubectl apply -f deployment.yaml

kubectl apply -f service.yaml

This will create pods and services for both the backend and frontend. These components will communicate internally within the cluster.

### 4. Expose the Client-Service:

For testing locally, use port forwarding

kubectl port-forward services/client-service 3000:3000

Visit the application in your browser:

http://localhost:3000

### 5. View Logs:

To check the logs of the running pods:

kubectl logs pods/<server/client>-<TAB_TO_COMPLETE>

Replace <server/client> with the respective pod name (e.g., server for the backend, client for the frontend).

# Happy Coding!

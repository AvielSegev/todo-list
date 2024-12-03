# ToDo App

## Overview:
A simple and efficient ToDo application designed to help users manage tasks, set priorities, and track progress.
For updates and progress during the development of this project, please refer to the Wiki section.

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

### Deployment Steps:

Clone the Repository:

git clone <repository_url>
cd <repository_name>

(Optional) Build Docker Images:

Build the images for the frontend and backend using the Dockerfiles located in the respective directories (frontend and server):

docker build -t <YOUR_IMAGE_NAME> ./frontend
docker build -t <YOUR_IMAGE_NAME> ./server

Update the deployment.yaml files in both frontend and server directories to use your custom image name:

spec:
  template:
    spec:
      containers:
        - image: <YOUR_IMAGE_NAME>
        
Apply Deployments and Services:

Navigate to each directory (frontend and server) and apply the Kubernetes manifests:

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

This will create pods and services for both the backend and frontend. These components will communicate internally within the cluster.

View Logs:
To check the logs of the running pods:

kubectl logs pods/<server/client>-<TAB_TO_COMPLETE>
Replace <server/client> with the respective pod name (e.g., server for the backend, client for the frontend).

Expose the Client-Service:
For testing locally, use port forwarding

kubectl port-forward services/client-service 3000:3000

Visit the application in your browser:
http://localhost:3000ToDo App
Overview
A simple and efficient ToDo application designed to help users manage tasks, set priorities, and track progress.

For updates and progress during the development of this project, please refer to the Wiki section.

Instructions to Deploy on a Kubernetes Cluster
Directory Structure
In the root directory of the repository, you will find the following folders:

frontend: Contains the source code for the frontend, including a Node.js server that serves a React application. The application is built and served on requests to /.
server: Hosts the backend code, which manages the ToDo items. It responds to RESTful API calls.
Workflow Overview:

The user performs an operation in the app.
This triggers an API call to the frontend.
The frontend forwards the request to the backend via another API call.
The backend processes the request and sends a response to the frontend.
The frontend displays the result to the user.
Deployment Steps
Clone the Repository

bash
Copy code
git clone <repository_url>
cd <repository_name>
(Optional) Build Docker Images

Build the images for the frontend and backend using the Dockerfiles located in the respective directories (frontend and server):
bash
Copy code
docker build -t <YOUR_IMAGE_NAME> ./frontend
docker build -t <YOUR_IMAGE_NAME> ./server
Update the deployment.yaml files in both frontend and server directories to use your custom image name:
yaml
Copy code
spec:
  template:
    spec:
      containers:
        - image: <YOUR_IMAGE_NAME>
Apply Deployments and Services

Navigate to each directory (frontend and server) and apply the Kubernetes manifests:
bash
Copy code
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
This will create pods and services for both the backend and frontend. These components will communicate internally within the cluster.
View Logs
To check the logs of the running pods:

bash
Copy code
kubectl logs pods/<server/client>-<TAB_TO_COMPLETE>
Replace <server/client> with the respective pod name (e.g., server for the backend, client for the frontend).

Expose the Client-Service

For testing locally, use port forwarding:
bash
Copy code
kubectl port-forward services/client-service 3000:3000
Visit the application in your browser:
http://localhost:3000


Happy Coding!

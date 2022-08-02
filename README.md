# Plan HEIG-VD

## Description
This project is an interactive map for the HEIG-VD school

It contains four directories :
- 01_doc is the administrative document for the project. 
    - You can read the french report that explain the creation process [here]()
- 02_plan isn't available on the public repository. It contains the geographical data used to create the application. 
- 03_code contain the serverAPI, the frontend, and sqlScriptCreator, a program that convert an arborescence of files to SQL scripts.
- 04_deploy contain the files to deploy the application on a virtual machine


## Installation
To install the project :

1. Clone the project in your local files
2. Follow the installation instruction of frontend [here]()
3. Follow the installation instruction of serverAPI [here]()

To deploy the project :

1. Install Docker engine on the machine you want to deploy
2. After you cloned the project go to the folder 04_deploy
3. create a .env file and copy the following code below inside.
```
DB_PASSWORD="yourPassword"
HOST= "yourDomain.web"
```
4. Adjust the parameters as you want
5. copy, if necessary, the docker-compose.yml file, the .env file and the sql folder on the distant machine.
6. Run on the distant machine the command `docker-compose --env-file ./.env up`
7. Wait (the creation of the database take a certain time)
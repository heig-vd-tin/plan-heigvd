# Plan HEIG-VD

## Description
This project is an interactive map for the HEIG-VD school

It contains four directories :
- 01_doc is the administrative document for the project. 
    - You can read the french report that explain the creation process [here]()
- 02_plan isn't available on the public repository. It contains the geographical data used to create the application. 
- 03_code contain the Server API, the frontend, and sqlScriptCreator, a program that convert an arborescence of files to SQL scripts.
    - [Frontend](https://gitlab.com/tb-heig/plan-heig-vd/-/tree/dev/03_code/frontend)
    - [Server API](https://gitlab.com/tb-heig/plan-heig-vd/-/tree/dev/03_code/serverAPI)
    - [sqlScriptCreator](https://gitlab.com/tb-heig/plan-heig-vd/-/tree/dev/03_code/sqlScriptCreator)
- 04_deploy contain the files to deploy the application on a virtual machine


## Installation

To install the project on your local machine :

1. Clone the project in your local files
2. Install PostgreSQL with the extension Postgis
3. Create the postgres user and choose a password
4. Go, with a terminal, to 04_deploy/sql folder
5. Run the command below to create the database (Note the third command take a moment to complete)
```
psql -U postgres -a -f 01_init.sql --quiet
psql -U postgres -a -f 02_create.sql --quiet
psql -U postgres -a -f 03_insert.sql --quiet
``` 
6. Follow the installation instruction of frontend [here](https://gitlab.com/tb-heig/plan-heig-vd/-/tree/dev/03_code/frontend)
7. Follow the installation instruction of serverAPI [here](https://gitlab.com/tb-heig/plan-heig-vd/-/tree/dev/03_code/serverAPI)
8. The application is available on `localhost:3000`

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
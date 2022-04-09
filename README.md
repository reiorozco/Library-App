
## Setup

Follow all these steps as explained below. Do not miss any steps, or you won't be able to run this application.

### Install PostgreSQL

To run this project, you need to install the latest version of PostgreSQL first.

https://www.postgresql.org/download/

Once you install PostgreSQL, make sure it's running.

Next, create a database, remember the database name that you create for sequelize connection.

### Install the Dependencies

Next, from the project folder, install the dependencies:

    npm i

Next, from the ./client folder, install the dependencies:

    cd client
    npm i

### Environment Variables

From the project folder, create a new folder with the name dev, inside, create a file with the name development.env and write your environment variables.

./env/development.env

    DB_USER=yourDataBaseUser
    DB_PASSWORD=yourDataBasePassword
    DB_HOST=localhost
    DB_NAME=yourDataBaseName*    

You need this, for sequelize connection, the file that create this connection is in ./startup/database.js 

### Start the Server

From the project folder, run:

    node run dev

This will launch the Node server on port 3000. If that port is busy, you can set a different point in ./index.js.

Open up your browser and head over to:

http://localhost:3000/api/books

You should see the list of books.

**Important**, the requests that the client is making are to port 3000, if you have the server running on another port, you also need to change the address where the client is making the requests in the following file /client/src/services/httpService.js

### Start the Client

From the ./client folder

    npm run dev

This will launch the React client on port 3001 by default, because you have busied the port 3000 with the server, you can set a different point in ./client/vite.config.js.

Open up your browser and head over to:

http://localhost:3001/

You should see the client.

### (Optional) Environment Variables

If you look from the project folder /package.json, the script dev is:

    "dev": "export NODE_ENV=development&& nodemon"

Depending on your OS the command changes:

On Mac:

    export NODE_ENV=development&& nodemon

On Windows:

    set NODE_ENV=development&& nodemon

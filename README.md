# RethinkDB Playground

Inspired by day one of [Seven Databases in Seven Days](https://developer.ibm.com/clouddataservices/2016/07/28/7-databases-7-days-rethinkdb/)

## Installation
`docker` is required. On a Mac, you can use the docker beta.

Other than that, npm and `npm install`.

## Initializing
Use `npm run db` to start `rethinkdb`. You can connect to
the admin panel with `localhost:8080`. 28015 is the port
to access the DB and is used in the app by default.

Use `npm run seed` to create the database, tables, seed
with data, and create indicies. *Note:* there is currently
no way to programmatically delete the database and you
cannot create it again once it exists. You can use the
admin panel to delete it, though.

## Running
Use `npm start` to run the app. This will start a server
on `PORT:=8000` where you can query the DB indirectly
with `/` for all lists, `/:name` for user Todos, and
`POST /todo/:id/complete` to mark items as complete
and `POST /todo/:id/incomplete` to mark items as incomplete.

The server will log real-time data changes, so you can see
your POST updates being written in real time to RethinkDB.

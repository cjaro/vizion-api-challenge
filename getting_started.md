# Getting Started

1) From the root of the project, run `docker-compose up`. Ensure nothing is running on 0.0.0.0:5432 that would create a conflict.
2) Connect to the DB either via command line or with a GUI like Sqlectron or Postico. Credentials are in `sample.env` (and you should copy this over to `.env` like this: `cp sample.env .env`).
3) Create your table:
    ```
    CREATE TABLE webinfo (
        id SERIES PRIMARY KEY,
        name VARCHAR(200),
        url VARCHAR(100)
        meta VARCHAR(500),
        created_at TIMESTAMP
    );
    ```
4) If you want, you can insert some test data (`INSERT` statement is found in `db/schema.sql`), or you can load it via the application itself.
5) Using a client like Postman or Insomnia, import `VizionAPICodeChallenge.postman_collection.json` or manually create three new requests:
    - `GET` a list of all objects: `http://localhost:5000/references/`
    - `GET` a specific object by ID: `http://localhost:5000/references/16`
    - `POST` a new URL (must include `https://`) to add info to the DB: `http://localhost:5000/api/?url={{newUrl}}`
    - Both `GET` methods can also be accessed in the browser
6) In another terminal, run `nodemon src/server.js`. Nodemon will watch this file & restart the server upon changes.
7) You can now visit [http://localhost:5000/references](http://localhost:5000/references) to see the JSON of the site information that you've added to the DB.

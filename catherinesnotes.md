# Catherine's Notes!

What is this? From Postman, you can send this application a URL, gather meta information, and save it to a Postgres DB. Then, you can make a GET request with that object's ID to view that information.

## Running the project:

- `cp sample.env .env` and supply postgres db credentials
- at the root of the project, execute `docker-compose up`
- Create a table:

```
CREATE TABLE webinfo (
id SERIES PRIMARY KEY,
name VARCHAR(200),
url VARCHAR(100),
meta VARCHAR(500),
created_at TIMESTAMP
);
```

- You can insert some test data from `samples.json` or supply the application a URL in the following steps and populate the table that way.
- in another terminal, run `nodemon src/server.js`. Nodemon will watch this file & restart the server upon changes.
- In Postman, import `VizionAPICodeChallenge.postman_collection.json` or create three new requests:
  - `GET` a list of all objects: `http://localhost:5000/references/`
  - `GET` a specific object by ID: `http://localhost:5000/references/16`
  - `POST` a new URL (must include `https://`) to add info to the DB: `http://localhost:5000/api/?url={{newUrl}}`
  - Both `GET` methods can also be accessed in the browser (TODO: create views)

### Other things to do

- **RabbitMQ**: schedule a weekly scrape/update of existing URLs from the DB
  - Rabbit could also be useful if you've got multiple people querying or submitting URLs; can monitor jobs as they're running and queueing up
- **JWT authorization**: making GET requests can be publicly accessible, but POST should require Editor role (or w/e)
- **Components**: refactor to split `server.js` into components & general clean up
- **Unit tests**: test each component, database connection, basic requests, data validation
- **Missing information**: what happens when a site doesn't have meta information?
  - For example, Netflix, Hulu, & HBOMax all don't have meta descriptions when a user is logged in (why would they care about SEO once they've got a paying customer?). So how do you circumvent this?
- **Views**: Building out a couple corresponding views to display the data could be useful, depending on the context of the application. Nice-to-have, not essential.
- JWT auth - GET is accessible, but to POST requires a certain role - editor? poster?

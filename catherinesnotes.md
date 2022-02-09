# Catherine's Notes!

What is this? From Postman, you can send this application a URL, gather meta information, and save it to a Postgres DB. Then, you can make a GET request with that object's ID to view that information.

## Running the project:
- `cp sample.env .env` and supply postgres db credentials
- at the root of the project, execute `docker-compose up`
- in another terminal, run `nodemon src/server.js`. Nodemon will watch this file & restart the server upon changes. 
- In Postman, create three new requests (or import `VizionAPICodeChallenge.postman_collection.json`):
  - GET a list of all objects: `http://localhost:5000/references/`
  - GET a specific object by ID: `http://localhost:5000/references/16`
  - POST a new URL (must include `https://`) to add info to the DB: `http://localhost:5000/api/?url={{newUrl}}`
  - Both GET methods can also be accessed in the browser (TODO: create views)

### Other things to do
- Add RabbitMQ to schedule a weekly scrape/update of existing URLs from the DB
- Rabbit could also be useful if you've got multiple people querying or submitting URLs; can monitor jobs as they're running and queueing up
- 

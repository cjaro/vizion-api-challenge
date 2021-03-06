import bodyParser from "body-parser";
import express from "express";
import puppeteer from "puppeteer";
import PG from "pg";
import "dotenv/config";

let dbUser = process.env.POSTGRES_USER;
let dbHost = process.env.POSTGRES_HOST;
let dbItself = process.env.POSTGRES_DB;
let dbPass = process.env.POSTGRES_PASSWORD;
let dbPort = process.env.POSTGRES_PORT;

const client = new PG.Client({
  user: dbUser,
  host: dbHost,
  database: dbItself,
  password: dbPass,
  port: dbPort
});

// connect once
client.connect();

const PORT = 5000;
const app = express();

let timeout = 1500000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world! 🚀");
});

app.get("/getwebpageonly", (req, res) => {
  try {
    let passInUrl = process.argv[2];
    console.log("Fetching", passInUrl);

    gatherSiteInformation(passInUrl).then((result) => {
      let values = [result.title, result.url, result.metaInformation, new Date()];

      console.log("Done.");
      res.send(values);
    });
  } catch (error) {
    res.send({ error: error.toString() });
  }
});

app.get("/references", async (req, res) => {
  let references = await getAllSiteInfo();
  res.send(references.rows);
});

app.get("/references/:id", async (req, res, next) => {
  const site = await getSiteInformationById(req.params.id);
  res.send(site.rows[0]);
});

// send url from postman
app.post("/api", (req, res) => {
  try {
    // get user-supplied URL from postman params
    let passInUrl = req.query.url;
    console.log("Fetching", passInUrl);

    gatherSiteInformation(passInUrl).then((result) => {
      let values = [result.title, result.url, result.metaInformation, new Date()];

      let selectQuery = "INSERT INTO webinfo (title, url, meta, created_at) values ($1, $2, $3, $4) RETURNING *";

      client.query(selectQuery, values, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows[0]);
        }
      });

      console.log("Done.");
      res.send(values);
    });
  } catch (error) {
    res.send({ error: error.toString() });
  }
});

// app.catch()
// get URLs from RabbitMQ and handle

async function gatherSiteInformation(url) {
  let newReference = {};

  return (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    newReference.title = await page.title();
    newReference.url = page.url();
    newReference.metaInformation = await page.$eval("head > meta[name='description']", (element) => element.content);

    await browser.close();

    return newReference;
  })();
}

async function getSiteInformationById(id) {
  console.log("Fetching site with ID", id);
  return await client.query("SELECT * FROM webinfo WHERE id = $1", [id]);
}

async function getAllSiteInfo() {
  return client.query("SELECT * FROM webinfo ORDER BY id;");
}

// async function updateOneSite(id) {
//   client.connect();
//   return client.query('', [id]);
// }

async function deleteOneSite(id) {
  return client.query("DELETE FROM webinfo WHERE id=$1;", [id]);
}

app.listen(PORT);
console.log(`🚀 App is listening on http://localhost:${PORT}/ 🚀`);

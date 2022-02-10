import express, { Application } from "express";
import corsImport from "cors";
import { checkAuthorizedMiddleware } from "./middleware/checkAuth";
import { login } from "./login";
import {
  postRequest as postRequestSanity,
  getRequest as getRequestSanity,
} from "./sanity";
import { postRequest as postRequestGraphCMS } from "./graphcms";

const bodyParser = require("body-parser");
const cors = corsImport({ origin: true });
const app: Application = express();

const port: number = parseInt(
  process.env.PORT || process.env.STARTPORT || "3000"
);

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Introduction message
app.get("/", function (_, res) {
  res.send("Node server is up.");
});

app.post("/auth/login", (req, res) => login(req, res));

// Apply middleware to check Authorization
app.use(checkAuthorizedMiddleware);
app.get("/api/sanity", (req, res) => getRequestSanity(req, res));
app.post("/api/sanity", (req, res) => postRequestSanity(req, res));
app.post("/api/graphcms", (req, res) => postRequestGraphCMS(req, res));

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});

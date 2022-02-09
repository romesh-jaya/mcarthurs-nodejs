import express, { Application } from "express";
import corsImport from "cors";
import { checkAuthorizedMiddleware } from "./middleware/checkAuth";
import { login } from "./login";
import { saveOrder as saveOrderStrapi } from "./strapi";
import { saveOrder as saveOrderGraphCMS } from "./graphcms";

const bodyParser = require("body-parser");
const cors = corsImport({ origin: true });
const app: Application = express();

const port: number = parseInt(
  process.env.PORT || process.env.STARTPORT || "3000"
);

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/auth/login", (req, res) => login(req, res));

// Apply middleware to check Authorization
app.use(checkAuthorizedMiddleware);
app.post("/api/save-order-strapi", (req, res) => saveOrderStrapi(req, res));
app.post("/api/save-order-graphcms", (req, res) => saveOrderGraphCMS(req, res));

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});

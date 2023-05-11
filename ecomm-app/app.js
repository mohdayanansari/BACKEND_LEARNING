const express = require("express");
require("dotenv").config(); //? -->need to place this above express initialization
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yamljs");

//?###Configure__Middleware###
// <==SWAGGER CONFIGURATION==>
const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookies & file middleware
app.use(cookieParser());
app.use(fileUpload());
// morgan middleware
app.use(morgan("tiny"));

//?Import Routes-->
const home = require("./routes/home");

//? Router Middleware -->
app.use("/api/v1", home);

// export app js
module.exports = app;

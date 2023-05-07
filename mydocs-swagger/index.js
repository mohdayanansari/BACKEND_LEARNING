const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const fileUpload = require("express-fileupload");

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

const PORT = process.env.PORT || 3050;

const courses = [
  {
    id: "11",
    name: "React Native",
    price: 299,
  },
  {
    id: "22",
    name: "React JS",
    price: 4899,
  },
  {
    id: "33",
    name: "Angular",
    price: 499,
  },
];

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/v1/ayan", (req, res) => {
  res.send("Hello from ayan");
});
app.get("/api/v1/object", (req, res) => {
  res.send({
    id: "55",
    name: "learn backend",
    price: 999,
  });
});
app.get("/api/v1/array", (req, res) => {
  res.send(courses);
});
app.get("/api/v1/course/:id", (req, res) => {
  const myCourse = courses.find((c) => c.id === req.params.id);
  res.status(200).send(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
  console.log(req.body);
  courses.push(req.body);
  res.send(true);
});

// handling query in swagger
app.get("/api/v1/courseQuery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  res.send({ location, device });
});

// uploading file
app.post("/api/v1/upload", (req, res) => {
  console.log(req.headers)
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";

  file.mv(path, (err) => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}🚀`);
});

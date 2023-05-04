const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}🚀`);
});

const express = require("express");
require("dotenv").config();

const app = express();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// view engine middleware
app.set("view engine", "ejs");
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

const { PORT } = process.env || 3066;

app.get("/", (req, res) => {
  res.send("Hello");
});
app.get("/getForm", (req, res) => {
  res.send(req.query);
});

app.post("/postForm", async (req, res) => {
  //   let file = req.files.myfile;

  // ###For multi file###
  let result;
  let imgArray = [];
  if (req.files) {
    for (let index = 0; index < req.files.myfile.length; index++) {
      result = await cloudinary.uploader.upload(
        req.files.myfile[index].tempFilePath,
        {
          folder: "users",
        }
      );
      imgArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  // ###For single file###
  //   result = await cloudinary.uploader.upload(file.tempFilePath, {
  //     folder: "users",
  //   });

  console.log(result);

  const details = {
    fname: req.body.fname,
    lname: req.body.lname,
    result,
    imgArray,
  };
  console.log(details);

  res.send(details);

  console.log(req.files);
});
app.get("/my-get", (req, res) => {
  res.render("getForm");
});
app.get("/my-post", (req, res) => {
  res.render("postform");
});

app.listen(PORT, () => console.log(`Server is live at ${PORT}🚀`));

const express = require("express");
const bodyParser = require("body-parser");
const graphqlhttp = require("express-graphql");
const { sequelize } = require("./models/index");
const graphqlConfig = require("./graphql/index");
const isAuth = require("./middleware/isAuth");
const storage = require("./storage");

const app = express();


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);
app.use(
  "/backend/files",
  storage({
    storageDir: process.env.STORAGE_DIR ?? "./files",
    tmpDir: process.env.TEMP_DIR ?? "./temp-uploads",
    maxUploadSize: 1024 * 1024 * 50, // 50 megabytes
    pictureQuality: 90,
    maxPicturePixels: 3840 * 2160, // 4K
    useImgMagick: false,
    onUpload: (req, res, next, result) => {
      res.send({
        uploaded: true,
        url:
          `${process.env.SERVER_PATH}/backend/files` +
          result.path +
          result.uuid +
          result.ext
      });
    }
  })
);

app.use(
  "/backend/api",
  graphqlhttp({
    schema: graphqlConfig.schema,
    rootValue: graphqlConfig.resolver,
    graphiql: true
  })
);

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
// });

// app.get("*", function(req, res) {
//   res.redirect("/");
// });
sequelize
  .authenticate()
  .then(() => {
    app.listen(5000);
    console.log("Connection has been established successfully.");
    console.log("Server running on port 5000");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });


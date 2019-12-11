const express = require("express");
const bodyParser = require("body-parser");
const graphqlhttp = require("express-graphql");
const { sequelize } = require("./models/index");
const RootSchema = require("./graphql/schemas/index");
const RootResolver = require("./graphql/resolvers/index");
const isAuth = require("./middleware/isAuth");
const storage = require("./storage");
const path = require("path");
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: "localhost",
//     dialect: "mysql"
//   }
// );

const app = express();

// const events = [];

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./frontend/build")));
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
  "/files",
  storage({
    storageDir: "./files",
    tmpDir: "./temp-uploads",
    maxUploadSize: 1024 * 1024 * 50, // 50 megabytes
    pictureQuality: 90,
    maxPicturePixels: 3840 * 2160, // 4K
    useImgMagick: false,
    onUpload: (req, res, next, result) => {
      res.send({
        uploaded: true,
        url:
          `${process.env.SERVER_PATH}/files` +
          result.path +
          result.uuid +
          result.ext
      });
    }
  })
);

app.use(
  "/api",
  graphqlhttp({
    schema: RootSchema,
    rootValue: RootResolver,
    graphiql: true
  })
);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

app.get("*", function(req, res) {
  res.redirect("/");
});
sequelize
  .authenticate()
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

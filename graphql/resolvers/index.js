const userresolver = require("./userRseolver");
const documentsolver = require("./documentResolver");
const noticessolver = require("./noticesResolver");
const notessolver = require("./notesResolver");
const chapterresolver = require("./chapterResolver");
const linkresolver = require("./linksResolver");
const linkcatagorysolver = require("./linkCatagoryResolver");
const videoresolver = require("./videosResolver");
const videocommentresolver = require("./videocommentResolver");
const sessionresolver = require("./sessionResolver.js");
const imageresolver = require("./imageresolver");
const featureresolver = require("./featureImageResolver");
module.exports = {
  ...userresolver,
  ...documentsolver,
  ...noticessolver,
  ...notessolver,
  ...chapterresolver,
  ...linkresolver,
  ...linkcatagorysolver,
  ...videoresolver,
  ...videocommentresolver,
  ...sessionresolver,
  ...imageresolver,
  ...featureresolver,
};

const multer = require("multer");
const path = require("path");

const pathTemp = path.join(__dirname, "../temp");

const multerConfig = multer.diskStorage({
  destination: pathTemp,
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;

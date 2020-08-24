var express = require("express");
var router = express.Router();
const fs = require("fs");
const http = require("http");
const pdf = require("html-pdf");
const tmpl = fs.readFileSync(
  require.resolve("../html_templates/businesscard.html"),
  "utf8"
);

/* GET home page. */
router.get("/", function(req, res) {
  if (req.url === "/favicon.ico") return res.end("404");
  // sample image
  const html = tmpl.replace(
    "{{image}}",
    `file://${require.resolve("../html_templates/sq.png")}`
  );
  pdf
    .create(html, { width: "50mm", height: "90mm" })
    .toStream((err, stream) => {
      if (err) return res.end(err.stack);
      res.setHeader("Content-type", "application/pdf");
      stream.pipe(res);
    });
});

module.exports = router;

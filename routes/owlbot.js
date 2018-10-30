var express = require("express");
var router = express.Router();
const https = require("https");

router.get("/", function(req, res, next) {
  var query = req.query.q;
  if (!query) return res.json([]);
  else {
    https
      .get(
        `https://owlbot.info/api/v1/dictionary/${decodeURIComponent(
          query
        )}?format=json`,
        resp => {
          let data = "";

          // A chunk of data has been recieved.
          resp.on("data", chunk => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            console.log(JSON.parse(data));
            res.json(JSON.parse(data));
          });
        }
      )
      .on("error", err => {
        console.log("Error: " + err.message);
        res.status(500).json({ error: err });
      });
  }
});

module.exports = router;

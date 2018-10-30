var express = require("express");
var router = express.Router();
var fs = require("fs");
var cities = [];

/* GET users listing. */
router.get("/", function(req, res, next) {
  var query = req.query.q;
  if (!cities.length) {
    fs.readFile(__dirname + "/../cities", function(err, data) {
      if (err) res.status(500).json(err);
      cities = data
        .toString()
        .split("\n")
        .map(function(city) {
          return { city: city };
        });
      if (!query) {
        res.json(cities);
      } else {
        var matchingCities = cities.filter(function(city) {
          return city.city.toLowerCase().includes(query.toLowerCase());
        });
        res.json(matchingCities);
      }
    });
  } else {
    if (!query) {
      res.json(cities);
    } else {
      var matchingCities = cities.filter(function(city) {
        return city.city.toLowerCase().includes(query.toLowerCase());
      });
      res.json(matchingCities);
    }
  }
});

module.exports = router;

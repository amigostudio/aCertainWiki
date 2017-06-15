var express = require('express');
var router = express.Router();
var wikiSchema = require("../model/wikiSchema");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/aCertainWiki');

/* GET home page. */
router.get('/', function(req, res, next) {
  wikiSchema.SYSTEM_PROPERTY.create({PROPERTY_NAME: "visitorCount", VALUE: 1}, function () {
    console.log("visitor inserted");
  });
  res.render('index', { title: '某韩国手游的WIKI站' });
});

module.exports = router;

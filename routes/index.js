var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '某韩国手游的WIKI站' });
});

module.exports = router;

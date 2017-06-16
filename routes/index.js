var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var systemPropertyCollection = require("../model/systemPropertyCollection");
mongoose.connect('mongodb://localhost/aCertainWiki');

/* GET home page. */
router.get('/', function (req, res, next) {
    var iVisitorCount = 1;

    systemPropertyCollection.findOne({ PROPERTY_NAME: "visitorCount" }, (err, docs) => {
        if (!docs) {
            systemPropertyCollection.create({ PROPERTY_NAME: "visitorCount", VALUE: 1 }, function () {
                console.log("visitor inserted");
            });
            
                res.render('index', { title: '某韩国手游的WIKI站', visitorCount: iVisitorCount });
        } else {
            systemPropertyCollection.findByIdAndUpdate(docs.id, {VALUE: (+docs.VALUE + 1)}, (err, docs) => {
                iVisitorCount = +docs.VALUE + 1
                res.render('index', { title: '某韩国手游的WIKI站', visitorCount: iVisitorCount });
            });
        }

    })


});

module.exports = router;

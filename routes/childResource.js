var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
// import models
var childCollection = require("../model/childCollection");
var degreeCollaction = require("../model/degreeCollaction");
var effectCollection = require("../model/effectCollection");
var parameterCollection = require("../model/parameterCollection");
var skillsCollection = require("../model/skillsCollection");
var tagCollaction = require("../model/tagCollaction");


/* GET home page. */
router.get('/', function (req, res, next) {
    // TODO

    
});

module.exports = router;

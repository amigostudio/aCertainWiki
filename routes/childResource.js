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


/* GET Child list */
router.get('/', function (req, res, next) {
    // TODO

    
});

/* POST creat child */
router.post('/', function (req, res, next) {
    debugger;
    // [todo]
    var requestBody = req.body;
    childCollection.findOne({NAME: requestBody.name}).then(function(err, doc) {
        if (doc) {
            throw new Error()
        }
    }).catch(function() {
        debugger;
    }) 
    

    // parameterCollection.insertParameter(postObject);
})

module.exports = router;

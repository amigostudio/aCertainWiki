let express = require('express');
let router = express.Router();
let mongoose = require("mongoose");

let tagCollaction = require("../model/tagCollaction");

router.get("/", (req, res, next) => {
    tagCollaction.find().then(docs => {
        let aTags = [];
        docs.forEach(doc => {
            aTags.push(doc._doc);
        });

        res.json(aTags).send();
    }).catch((err) => {
        console.error(err);
        next(err);
    });
});

router.post("/", (req, res, next) => {
    var sTag = req.body.tag;
    if (!sTag) {
        throw {
            status: 400,
            message: "Tag cannot be empty!",
            code: -1000
        };
    }

    tagCollaction.findOne({tag: sTag}).then(doc => {
        if (doc) {
            next({
                status: 400,
                code: -1001,
                message: "Tag '" + sTag + "' has already been created!"
            });
        } else {
            tagCollaction.create({tag: sTag}).then(doc => {
                res.json({
                    _id: doc.id,
                    tag: doc.tag
                }).send();
            });
        }
    });
    
});

module.exports = router;
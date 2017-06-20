var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
// import models
var childCollection = require("../model/childCollection");
var degreeCollaction = require("../model/degreeCollaction");
var effectCollection = require("../model/effectCollection");
var parameterCollection = require("../model/parameterCollection");
var skillCollection = require("../model/skillCollection");
var tagCollaction = require("../model/tagCollaction");


/* GET Child list */
router.get('/', function (req, res, next) {
    // TODO

    
});

/* POST creat child */
router.post('/', (req, res, next) => {
    var oRequestBody = req.body;
    var oDegree = oRequestBody.degree[0];
    var oParameter = oRequestBody.degree[0].parameter;
    var oChildToSave = {};
    var oSkill = {};
    childCollection.findOne({NAME: oRequestBody.name}).then((err, doc) => {
        if (doc) {
            throw new Error("Child with name '" + oRequestBody.name + "' already exists!");
        }
        let aEffectPromises = [];
        let aSkillParamPromises = [];
        let iHeavy = 0, iSlide = 0, iDrive = 0;

        for (var i in oDegree.skill.heavy) {
            var oEffect = oDegree.skill.heavy[i];
            iHeavy++;
            var obj = JSON.parse(JSON.stringify({
                "type": oEffect.type,
                "value": oEffect.value,
                "target": oEffect.target,
                "targetAmount": oEffect.targetAmount,
                "duration": oEffect.duration,
                "times": oEffect.times
            }));

            aEffectPromises.push(effectCollection.create(obj));
        }

        for (var i in oDegree.skill.slide) {
            var oEffect = oDegree.skill.slide[i];
            iSlide++;
            var obj = JSON.parse(JSON.stringify({
                "type": oEffect.type,
                "value": oEffect.value,
                "target": oEffect.target,
                "targetAmount": oEffect.targetAmount,
                "duration": oEffect.duration,
                "times": oEffect.times
            }));
            aEffectPromises.push(effectCollection.create(obj));            
        }

        for (var i in oDegree.skill.drive) {
            var oEffect = oDegree.skill.drive[i];
            iDrive++;
            var obj = JSON.parse(JSON.stringify({
                "type": oEffect.type,
                "value": oEffect.value,
                "target": oEffect.target,
                "targetAmount": oEffect.targetAmount,
                "duration": oEffect.duration,
                "times": oEffect.times
            }));
            aEffectPromises.push(effectCollection.create(obj));
        }

        aSkillParamPromises.push(parameterCollection.create({
            "HP": oParameter.HP,
			"ATK": oParameter.ATK,
			"DEF": oParameter.DEF,
			"AGL": oParameter.AGL,
			"CRI": oParameter.CRI,
			"OVR": oParameter.OVR
        }));
        
        let oSkillPromise = Promise.all(aEffectPromises).then(values => {
            var oSaveSkill = {};
            var i = 0;
            oSaveSkill.attack = oDegree.skill.attack;
            oSaveSkill.heavy = [];
            oSaveSkill.slide = [];
            oSaveSkill.drive = [];

            while(iHeavy--) {
                oSaveSkill.heavy.push(values[i].id);
                i++;
            }
            while(iSlide--) {
                oSaveSkill.slide.push(values[i].id);
                i++;
            }
            while(iDrive--) {
                oSaveSkill.drive.push(values[i].id);
                i++;
            }
            return skillCollection.create(oSaveSkill);
        });

        aSkillParamPromises.push(oSkillPromise);
        
        Promise.all(aSkillParamPromises).then(values => {
            oParameterModel = values[0];
            oSkillModel = values[1];
            return degreeCollaction.create({
                star: oDegree.star,
                level: oDegree.level,
                plus: oDegree.plus,
                parameter: oParameterModel.id,
                skill: oSkillModel.id
            });
        }).then((oDegreeModel) => {
            var oChild = {};
            oChild.name = oRequestBody.name;
            oChild.icon = oRequestBody.icon;
            oChild.initStar = oRequestBody.initStar;
            oChild.type = oRequestBody.type;
            oChild.career = oRequestBody.career;
            oChild.degree = [oDegreeModel.id];
            oChild.tag = [];
            
            childCollection.create(oChild).then((oChildModel) => {
                res.json({
                    id: oChildModel.id
                });
                res.send();
            });
        });
    }).catch(function(err) {
        console.log(err);
    });
    // parameterCollection.insertParameter(postObject);
});

module.exports = router;

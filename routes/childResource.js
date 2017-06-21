let express = require('express');
let router = express.Router();
let mongoose = require("mongoose");
// import models
let childCollection = require("../model/childCollection");
let degreeCollaction = require("../model/degreeCollaction");
let effectCollection = require("../model/effectCollection");
let parameterCollection = require("../model/parameterCollection");
let skillCollection = require("../model/skillCollection");



/* GET Child list */
router.get('/', function (req, res, next) {
    // TODO
    let a = childCollection.find().then((docs) => {
        let aChilds = [];
        docs.forEach(oItem => {
            aChilds.push(oItem._doc);
        })
        res.json(aChilds).send();
    }).catch(err => {
        console.error(err);
    });
});

/* GET Child by Id */
router.get('/:childId', function (req, res, next) {
    // TODO
    let sChildId = req.params.childId;
    childCollection.findById(sChildId).populate({
        path: 'degree',
        select: '_id star parameter plus skill level',

        populate: {
            path: 'parameter skill'
        }
    }).exec((err, doc) => {
        let oObj = doc._doc;
        let oDegree = oObj.degree[0]._doc
        let aEffectPromises = [];
        oObj.degree[0] = oDegree;

        // [TODO] populate skill info
        let aHeavyEffectIds = oDegree.skill.heavy;
        let aSlideEffectIds = oDegree.skill.slide;
        let aDriveEffectIds = oDegree.skill.drive;

        let aHeavyEffects = [];
        let aSlideEffects = [];
        let aDriveEffects = [];

        aHeavyEffectIds.forEach(oHeavyEffectId => {
            aEffectPromises.push(effectCollection.findById(oHeavyEffectId).then(doc => {
                aHeavyEffects.push(doc);
            }));
        })
        aSlideEffectIds.forEach(oSlideEffectId => {
            aEffectPromises.push(effectCollection.findById(oSlideEffectId).then(doc => {
                aSlideEffects.push(doc);
            }));
        })
        aDriveEffectIds.forEach(oDriveEffectId => {
            aEffectPromises.push(effectCollection.findById(oDriveEffectId).then(doc => {
                aDriveEffects.push(doc);
            }));
        })

        Promise.all(aEffectPromises).then(values => {
            oObj.degree[0].skill.heavy = aHeavyEffects;
            oObj.degree[0].skill.slide = aSlideEffects;
            oObj.degree[0].skill.drive = aDriveEffects;

            res.json(oObj).send();
        })

    }).catch((err) => {
        console.log(err);
    });

});

/* POST creat child */
router.post('/', (req, res, next) => {
    let oRequestBody = req.body;
    let oDegree = oRequestBody.degree[0];
    let oParameter = oRequestBody.degree[0].parameter;
    let oChildToSave = {};
    let oSkill = {};
    childCollection.findOne({NAME: oRequestBody.name}).then((err, doc) => {
        if (doc) {
            throw new Error("Child with name '" + oRequestBody.name + "' already exists!");
        }
        let aEffectPromises = [];
        let aSkillParamPromises = [];
        let iHeavy = 0, iSlide = 0, iDrive = 0;

        for (let i in oDegree.skill.heavy) {
            let oEffect = oDegree.skill.heavy[i];
            iHeavy++;
            let obj = JSON.parse(JSON.stringify({
                "type": oEffect.type,
                "value": oEffect.value,
                "target": oEffect.target,
                "targetAmount": oEffect.targetAmount,
                "duration": oEffect.duration,
                "times": oEffect.times
            }));

            aEffectPromises.push(effectCollection.create(obj));
        }

        for (let i in oDegree.skill.slide) {
            let oEffect = oDegree.skill.slide[i];
            iSlide++;
            let obj = JSON.parse(JSON.stringify({
                "type": oEffect.type,
                "value": oEffect.value,
                "target": oEffect.target,
                "targetAmount": oEffect.targetAmount,
                "duration": oEffect.duration,
                "times": oEffect.times
            }));
            aEffectPromises.push(effectCollection.create(obj));            
        }

        for (let i in oDegree.skill.drive) {
            let oEffect = oDegree.skill.drive[i];
            iDrive++;
            let obj = JSON.parse(JSON.stringify({
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
            let oSaveSkill = {};
            let i = 0;
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
            let oChild = {};
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
        console.error(err);
    });
    // parameterCollection.insertParameter(postObject);
});

module.exports = router;

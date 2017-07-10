let express = require('express');
let router = express.Router();
let mongoose = require("mongoose");
let errCode = require("../utils/errorCode");
// import models
let childCollection = require("../model/childCollection");
let degreeCollaction = require("../model/degreeCollaction");
let effectCollection = require("../model/effectCollection");
let parameterCollection = require("../model/parameterCollection");
let skillCollection = require("../model/skillCollection");
let tagCollection = require("../model/tagCollection");



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
    childCollection.findOne({name: oRequestBody.name}).then((doc) => {
        if (doc) {
            throw {
                status: 409,
                message: "Child with name '" + oRequestBody.name + "' already exists!",
                code: errCode.DUPLICATE_CREATION
            };
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
    }).catch(err => {
        let resBody = {};
        resBody.errorCode = err.code;
        resBody.errorMessage = err.message
        
        res.status(err.status).json(resBody).send();
    });
    // parameterCollection.insertParameter(postObject);
});

router.put('/:childId/addTag', (req, res, next) => {
    let sChildId = req.params.childId;
    let sTag = req.body.tag;
    if (!sTag) {
        throw {
            status: 400,
            message: "Tag cannot be empty!",
            code: errCode.PARAMETER_MISSING
        }
    } 
    
    childCollection.findById(sChildId).populate({
        path: 'degree',
        select: '_id tag',

        populate: {
            path: 'tag'
        }
    }).exec((err, oChild) => {
        if (!oChild) {
            let resBody = {};
            resBody.errorCode = errCode.ENTITY_NOT_FOUND;
            resBody.errorMessage = "Child with id: '" + sChildId + "' does not exist!"
            
            res.status(400).json(resBody).send();
            return;
        }
        let oObj = oChild._doc;
        if (oObj.tag) {
            tagCollection.findOne({"tag": sTag}).then((doc) => {
                if (doc) {
                    return doc.id;
                }
            }).then((sDocId) => {
                if (oObj.tag.some((oTag) => { return oTag.toString()   === sDocId })) {
                    throw {
                        status: 409,
                        message: "Tag already add to this child",
                        code: errCode.DUPLICATE_CREATION
                    };
                } else {
                    oObj.tag.push(sDocId);
                    childCollection.update({_id: oChild.id}, oChild, ()=> res.status(204).send());
                }
            }).catch(err => {
                let resBody = {};
                resBody.errorCode = err.code;
                resBody.errorMessage = err.message
                
                res.status(err.status).json(resBody).send();
            });
        }
        
    }).catch(err => {
        let resBody = {};
        resBody.errorCode = err.code;
        resBody.errorMessage = err.message
        
        res.status(err.status).json(resBody).send();
    });
});

module.exports = router;

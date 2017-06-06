module.exports = Skills;
var Effect = require('./effectClass');

"use strict";

/**
 * Constructor of class Skills
 * @constructor
 * 
 * @param {object} mParams
 * @param {int} mParams.attack Basic attack value (auto attack)
 * @param {array} mParams.heavySkillEffects Effects of heavy skill
 * @param {array} mParams.slideSkillEffects Effects of slide skill
 * @param {array} mParams.driveSkillEffects Effects of drive skill
 * @param {array} mParams.leaderSkillEffects Effects of leader skill
 * 
 * @returns {Skills} this
 */
function Skills(mParams) {
    this.setAttack(mParams.attack);
    this.setHeavySkillEffects(mParams.heavySkillEffects);
    this.setSlideSkillEffects(mParams.slideSkillEffects);
    this.setDriveSkillEffects(mParams.driveSkillEffects);
    this.setLeaderSkillEffects(mParams.leaderSkillEffects);
}

// getter and setter for property 'attack' 
Skills.prototype.getAttack = function() {  
    return this.attack;
}
Skills.prototype.setAttack = function(iAttack) { 
    if (isNaN(iAttack)) {
        throw new TypeError("Illeagal input type when setting Skills.attack!")
    }
    this.attack = iAttack

    return this;
}

// getter and setter for property 'heavySkillEffects' 
Skills.prototype.getHeavySkillEffects = function() {  
    return this.heavySkillEffects;
}
Skills.prototype.setHeavySkillEffects = function(aHeavySkillEffects) { 
    if (isNaN(aHeavySkillEffects.length)) {
        throw new TypeError("Illeagal input type when setting Skills.heavySkillEffects!")
    }
    this.heavySkillEffects = aHeavySkillEffects;

    return this;
}

// getter and setter for property 'slideSkillEffects' 
Skills.prototype.getSlideSkillEffects = function() {  
    return this.slideSkillEffects;
}
Skills.prototype.setSlideSkillEffects = function(aSlideSkillEffects) { 
    if (isNaN(aSlideSkillEffects.length)) {
        throw new TypeError("Illeagal input type when setting Skills.slideSkillEffects!")
    }
    this.slideSkillEffects = aSlideSkillEffects;

    return this;
}

// getter and setter for property 'slideSkillEffects' 
Skills.prototype.getDriveSkillEffects = function() {  
    return this.driveSkillEffects;
}
Skills.prototype.setDriveSkillEffects = function(aDriveSkillEffects) { 
    if (isNaN(aDriveSkillEffects.length)) {
        throw new TypeError("Illeagal input type when setting Skills.driveSkillEffects!")
    }
    this.driveSkillEffects = aDriveSkillEffects;

    return this;
}

// getter and setter for property 'leaderSkillEffects' 
Skills.prototype.getLeaderSkillEffects = function() {  
    return this.leaderSkillEffects;
}
Skills.prototype.setLeaderSkillEffects = function(aLeaderSkillEffects) { 
    if (isNaN(aLeaderSkillEffects.length)) {
        throw new TypeError("Illeagal input type when setting Skills.leaderSkillEffects!")
    }
    this.leaderSkillEffects = aLeaderSkillEffects;

    return this;
}

// Override toString function
Skills.prototype.toString = function () {
    var sOutputString = "Skills: {'attack': " + this.getAttack() + ", " 
                + "'heavySkill': [ {";
    this.getHeavySkillEffects().forEach(function(oEffect) {
        sOutputString += oEffect.toString();
        sOutputString += "}, "
    });
    sOutputString = sOutputString.slice(0, sOutputString - 2) + "], ";

    sOutputString += "slideSkill: [ {";
    this.getSlideSkillEffect().forEach(function(oEffect) {
        sOutputString += oEffect.toString();
        sOutputString += "}, "
    });
    sOutputString = sOutputString.slice(0, sOutputString - 2) + "], ";

    sOutputString += "driveSkill: [ {";
    this.getDriveSkillEffects().forEach(function(oEffect) {
        sOutputString += oEffect.toString();
        sOutputString += "}, "
    });
    sOutputString = sOutputString.slice(0, sOutputString - 2) + "], ";

    sOutputString += "leaderSkill: [{";
    this.getLeaderSkillEffects().forEach(function(oEffect) {
        sOutputString += oEffect.toString();
        sOutputString += "}, "
    });
    sOutputString = sOutputString.slice(0, sOutputString - 2) + "] } ";

    sOutputString += "}";

    return sOutputString;
}

// add Effect functions for skills
Skills.prototype.addHeavySkillEffect = function(oEffect) {  
    this.setHeavySkillEffects(this.getHeavySkillEffects().push(oEffect));

    return this;
}

Skills.prototype.addSlideSkillEffect = function(oEffect) {
    this.setSlideSkillEffects(this.getSlideSkillEffects().push(oEffect));

    return this;
}

Skills.prototype.addDriveSkillEffect = function(oEffect) {
    this.setDriveSkillEffects(this.getDriveSkillEffects().push(oEffect));

    return this;
}

Skills.prototype.addLeaderSkillEffect = function(oEffect) {
    this.setLeaderSkillEffects(this.getLeaderSkillEffects().push(oEffect));

    return this;
}
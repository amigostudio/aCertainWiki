module.exports = Paramter;

"use strict";

function Paramter(mParams) {
    this.HP = +mParams.HP ? +mParams.HP : 0;
    this.ATK = +mParams.ATK ? +mParams.ATK : 0;
    this.DEF = +mParams.DEF ? +mParams.DEF : 0;
    this.AGL = +mParams.AGL ? +mParams.AGL : 0;
    this.CRI = +mParams.CRI ? +mParams.CRI : 0;
    this.OVR = +mParams.OVR ? +mParams.OVR : 0;
}

// getter and setter for property HP
Paramter.prototype.getHP = function () {
    return this.HP;
}
Paramter.prototype.setHP = function (iHP) {  
    if (!isNaN(iHP)) {
        this.HP = iHP;
    }
    return this;
};

// getter and setter for property ATK
Paramter.prototype.getATK = function () {
    return this.ATK;
}
Paramter.prototype.setATK = function (iATK) {  
    if (!isNaN(iATK)) {
        this.ATK = iATK;
    }
    return this;
};

// getter and setter for property DEF
Paramter.prototype.getDEF = function () {
    return this.DEF;
}
Paramter.prototype.setDEF = function (iDEF) {  
    if (!isNaN(iDEF)) {
        this.DEF = iDEF;
    }
    return this;
};

// getter and setter for property AGL
Paramter.prototype.getAGL = function () {
    return this.AGL;
}
Paramter.prototype.setAGL = function (iAGL) {  
    if (!isNaN(iAGL)) {
        this.HP = iAGL;
    }
    return this;
};

// getter and setter for property CRI
Paramter.prototype.getCRI = function () {
    return this.CRI;
}
Paramter.prototype.setCRI = function (iCRI) {  
    if (!isNaN(iCRI)) {
        this.CRI = iCRI;
    }
    return this;
};

// getter and setter for property OVR
Paramter.prototype.getOVR = function () {
    return this.OVR;
}
Paramter.prototype.setOVR = function (iOVR) {  
    if (!isNaN(iOVR)) {
        this.OVR = iOVR;
    }
    return this;
};

// Override toString function
Paramter.prototype.toString = function () {
    return "Parameter: {'HP': " + this.getHP() + ", " 
                    + "'ATK': " + this.getATK() + ", "
                    + "'DEF': " + this.getDEF() + ", "
                    + "'AGL': " + this.getAGL() + ", "
                    + "'CRI': " + this.getCRI() + ", "
                    + "'OVR': " + this.getOVR() + "} ";
}
module.exports = Skills;
var Skills = require('./skillsClass');
var Parameter = require('./parameterClass')

"use strict";

/**
 * @constructor
 * Constructor for Class Child
 * @param {object} mParam
 * @param {int} mParam.id key id of the child
 * @param {string} name name of the child
 * @param {string} icon icon uri of the child
 * @param {int} initStar initial star count of the child, range: 1 to 5
 * @param {int} type element type of the child, 1 for 火, 2 for 水, 3 for 木, 4 for 光, 5 for 暗
 * @param {int} career career of the child, 1 for 刀, 2 for 盾, 3 for 奶, 4 for 妨害, 5 for 辅助, 6 for 其他
 * @param {Parameter} parameter basic parameters of the child
 * @param {Skills} skills skills of the child
 * @param {array} tags an array of tags for the child
 * @param {string} description detail information of the child
 * 
 * @returns this;
 * 
 */
function Child(mParam) {
    this.setId(mParam.id);
    this.setName(mParam.name);
    this.setIcon(mParam.icon);
    this.setInitStar(mParam.initStar);
    this.setType(mParam.type);
    this.setCareer(mParam.career);
    this.setParameter(mParam.parameter);
    this.setSkills(mParam.skills);
    this.setTags(mParam.tags);
    this.setDescription(mParam.description);
}

// getter and setter for property 'id'
Child.prototype.getId = function() {
    return this.id;
}
Child.prototype.setId = function(iId) {  
    if (isNaN(iId)) {
        throw new TypeError("Illeagal input type when setting Child.id!");
    }
    this.id = iId;

    return this;
};

// getter and setter for property 'Name'
Child.prototype.getName = function() {  
    return this.name;
}
Child.prototype.setName = function(sName) {
    if (typeof(sName) !== "string") {
        throw new TypeError("Illeagal input type when setting Child.name!");
    }

    this.name = sName
    return this;
}

// getter and setter for property 'icon'
Child.prototype.getIcon = function() {  
    return this.icon;
}
Child.prototype.setIcon = function(sIcon) {
    if (typeof(sIcon) !== "string") {
        throw new TypeError("Illeagal input type when setting Child.icon!");
    }

    this.icon = sIcon
    return this;
}

// getter and setter for property 'initStar'
Child.prototype.getInitStar = function() {
    return this.initStar;
}
Child.prototype.setInitStar = function(iInitStar) {
    switch (iInitStar) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            this.initStar = iInitStar;
            break;
        default:
            throw new TypeError("'"+ iInitStar +"' is an illeagal input value when setting Child.initStar!");
    }
    return this;
};

// getter and setter for property 'type'
Child.prototype.getType = function() {
    return this.type;
}
Child.prototype.setType = function(iType) {  
    switch (iType) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            this.type = iType;
            break;
        default:
            throw new TypeError("'"+ iType +"' is an illeagal input value when setting Child.type!");
    }

    return this;
};

// getter and setter for property 'career'
Child.prototype.getCareer = function() {
    return this.career;
}
Child.prototype.setCareer = function(iCareer) {  
    switch (iCareer) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            this.career = iCareer;
            break;
        default:
            throw new TypeError("'"+ iCareer +"' is an illeagal input value when setting Child.career!");
    }
    return this;
};

// getter and setter for property 'Parameter'
Child.prototype.getParameter = function() {
    return this.parameter;
}
Child.prototype.setParameter = function(oParameter) {
    this.parameter = oParameter;

    return this;
}

// getter and setter for property 'Skills'
Child.prototype.getSkills = function() {
    return this.skills;
}
Child.prototype.setSkills = function(oSkills) {
    this.skills = oSkills;

    return this;
}

// getter and setter for property 'tags'
Child.prototype.getTags = function() {
    return this.tags;
}
Child.prototype.setTags = function(aTags) {
    if (isNaN(aTags.length)) {
        throw new TypeError("'"+ aTags +"' is an illeagal input value when setting Child.tags!");
    }
    this.tags = aTags;

    return this;
}

// getter and setter for property 'description'
Child.prototype.getDescription = function() {
    return this.description;
}
Child.prototype.setDescription = function(sDescription) {
    if (typeof(sDescription) !== "string") {
        throw new TypeError("Illeagal input type when setting Child.description!");
    }

    this.description = sDescription;
    return this;
}

// override toString() function
Child.prototype.toString = function() {
    return "Child: {'id': " + this.getId() + ", " 
                    + "'name': " + this.getName() + ", "
                    + "'icon': " + this.getIcon() + ", "
                    + "'initStar': " + this.getInitStar() + ", "
                    + "'type': " + this.getType() + ", "
                    + "'career': " + this.getCareer() + ", "
                    + "'parameter': " + this.getParameter().toString() + ", "
                    + "'skills': " + this.getSkills().toString() + ", "
                    + "'tags': " + this.getTags() + ", "
                    + "'description': " + this.getDescription() + "} ";
}

Child.prototype.addTag = function(sTag) {
    this.removeTag(sTag);
    this.setTags(this.getTags().push(sTag));

    return this;
}

Child.prototype.removeTag = function(sTag) {
    var aTags = this.getTags();
    var iTag = aTags.findIndex(function(tag) {
        return sTag === tag;
    });
    if (iTag === -1) {
        console.warn("tag '" + sTag + "' not found when trying to remove.");
    } else {
        var sRemoved = aTags.splice(iTag, 1);
        console.log("tag '" + sRemoved + "' is removed.");
    }

    return this;
}
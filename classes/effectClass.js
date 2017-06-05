module.exports = Effect;

"use strict";

/**
 * @constructor
 * constructor of effect class
 * @param {object} mParams
 * @param {string} mParams.type 技能的效果类型
 * @param {float} mParams.value 技能的效果数值（如伤害数值，回复数值等）
 * @param {string} mParams.target 技能的目标（对方/己方）
 * @param {int} mParams.targetAmount 技能的目标数量
 * @param {float} mParams.duration 技能效果的持续时间
 * @param {int} mParams.times 技能效果发动次数
 * 
 */
function Effect(mParams) {
    if (typeof(mParams) !== "object") {
        throw new TypeError("Illeagal constructor parameter for class 'Effect'!");
    };
    this.setType(mParams.type);
    this.setValue(mParams.value);
    this.setTarget(mParams.target);
    this.setTargetAmount(mParam.targetAmount);
    this.setDuration(mParam.duration);
    this.setTimes(mParam.times);

    return this;
}

// getter and setter for property 'type'
Effect.prototype.getType = function () {  
    return this.type;
}
Effect.prototype.setType = function (sType) {  
    if (typeof(sType) !== "string") {
        throw new TypeError("Illeagal input type when setting Effect.value!");
    }
    this.type = sType;

    return this;
}

// getter and setter for property 'value'
Effect.prototype.getValue = function () {  
    return this.value;
}
Effect.prototype.setValue = function (fValue) {  
    if (isNaN(fValue)) {
        throw new TypeError("Illeagal input type when setting Effect.value!");
    }
    this.value = fValue;

    return this;
}

// getter and setter for property 'target'
Effect.prototype.getTarget = function () {  
    return this.target;
}
Effect.prototype.setTarget = function (sTarget) {  
    if (typeof(sTarget) !== "string") {
        throw new TypeError("Illeagal input type when setting Effect.target!");
    }
    this.target = sTarget;

    return this;
}

// getter and setter for property 'targetAmount'
Effect.prototype.getTargetAmount = function () {  
    return this.targetAmount;
}
Effect.prototype.setTargetAmount = function (iTargetAmount) {  
    if (isNaN(iTargetAmount)) {
        throw new TypeError("Illeagal input type when setting Effect.targetAmount!");
    }
    this.targetAmount = iTargetAmount;

    return this;
}

// getter and setter for property 'duration'
Effect.prototype.getDuration = function () {  
    return this.duration;
}
Effect.prototype.setDuration = function (fDuration) {  
    if (isNaN(fDuration)) {
        throw new TypeError("Illeagal input type when setting Effect.duration!");
    }
    this.duration = fDuration;

    return this;
}

// getter and setter for property 'times'
Effect.prototype.getTimes = function () {  
    return this.times;
}
Effect.prototype.setTimes = function (iTimes) {  
    if (isNaN(iTimes)) {
        throw new TypeError("Illeagal input type when setting Effect.vatimeslue!");
    }
    this.times = iTimes;

    return this;
}

// Override toString function
Effect.prototype.toString = function () {
    return "Effect: {'type': " + this.getType() + ", " 
                + "'value': " + this.getValue() + ", "
                + "'target': " + this.getTarget() + ", "
                + "'targetAmount': " + this.getTargetAmount() + ", "
                + "'duration': " + this.getDuration() + ", "
                + "'times': " + this.getTimes() + "} ";
}
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
Effect = function (mParams) {
    this.type = mParams.type;
    this.value = mParams.value;
    this.target = mParams.target;
    this.targetAmount = mParams.targetAmount;
    this.duration = mParams.duration;
    this.times = mParams.times;
}
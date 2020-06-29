'use strict';

const joi = require('@hapi/joi');

module.exports = joi.object().keys({
    fullname: joi.string().min(5).max(60).required(),
    birthdate: joi.date()
}).required();
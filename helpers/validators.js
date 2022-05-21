const Joi = require('@hapi/joi');

const registrationValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required(),
    })
    return schema.validate(data);
}

const loginValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(8).required()
    })
    return schema.validate(data);
}

module.exports.registrationValidator = registrationValidator;
module.exports.loginValidator = loginValidator

// const Joi = require('@hapi/joi');

// const registrationValidator = (data) => {
//     const schema = Joi.object({
//         username: Joi.string().min(6).required().alphanum(),
//         email: Joi.string().min(6).required().email(),
//         password: Joi.string().min(6).required(),
//         role: Joi.string()
//     })
//     return schema.validate(data);
// }

// const loginValidator = (data) => {
//     const schema = Joi.object({
//         email: Joi.string().min(6).required(),
//         password: Joi.string().min(6).required()
//     })
//     return schema.validate(data);
// }

// module.exports.registrationValidator = registrationValidator;
// module.exports.loginValidator = loginValidator
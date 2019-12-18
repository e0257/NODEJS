import Joi from '@hapi/joi';

export const userSchema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().min(3).max(20).alphanum().required(),
    password: Joi.string().regex(/^(?!\d*$|[a-z]*$)[a-z\d]+$/i).message('Password should contain letters and numbers').required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

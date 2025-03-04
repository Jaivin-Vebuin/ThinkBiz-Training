import joi from 'joi';

export const userDeleteValidationSchema = joi.object({
    id: joi.number().required(),
});

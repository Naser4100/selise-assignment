import Joi from 'joi';

// Login validator
const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginValidator = (data: any) => {
  const result = loginSchema.validate(data);
  result.value = data;
  return result;
};

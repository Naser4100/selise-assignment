import Joi from 'joi';

// Registration validator
const registrationSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  occupation: Joi.string().required(),
});

export const registrationValidator = (data: any) => {
  const result = registrationSchema.validate(data);
  result.value = data;
  return result;
};

// Set password validator
const setPasswordSchema = Joi.object().keys({
  password: Joi.string().required(),
});

export const setPasswordValidator = (data: any) => {
  const result = setPasswordSchema.validate(data);
  result.value = data;
  return result;
};

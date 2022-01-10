import Joi from 'joi';

// Add new product validator
const productList = Joi.object().keys({
  productId: Joi.string().required(),
  quantity: Joi.string().required(),
  totalPrice: Joi.string().required(),
  size: Joi.string().required(),
});

const addNewOrderSchema = Joi.object().keys({
  productList: Joi.array().items(productList).min(1).required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

export const addNewOrderValidator = (data: any) => {
  const result = addNewOrderSchema.validate(data);
  result.value = data;
  return result;
};

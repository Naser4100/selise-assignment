import Joi from 'joi';

// Add new product validator
const productSchema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().required(),
  details: Joi.string().required(),
  quantity: Joi.number().required(),
  sizes: Joi.array().items(Joi.string()),
  productImages: Joi.array().items(Joi.string()),
});

export const productValidator = (data: any) => {
  const result = productSchema.validate(data);
  result.value = data;
  return result;
};

// Update product validator
const updateProductSchema = Joi.object().keys({
  productId: Joi.string().required(),
  updatedInfo: Joi.object().required(),
});

export const updateProductValidator = (data: any) => {
  const result = updateProductSchema.validate(data);
  result.value = data;
  return result;
};

import Joi from "joi";

const CreateUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

export { CreateUserSchema };

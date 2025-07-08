import Joi from "joi";

const UpdateUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email(),
});

export { UpdateUserSchema };

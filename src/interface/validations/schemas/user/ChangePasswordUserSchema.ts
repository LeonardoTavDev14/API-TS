import Joi from "joi";

const ChangePasswordUserSchema = Joi.object({
  email: Joi.string().email().required(),
});

export { ChangePasswordUserSchema };

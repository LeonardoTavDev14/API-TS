import Joi from "joi";

const AuthUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { AuthUserSchema };

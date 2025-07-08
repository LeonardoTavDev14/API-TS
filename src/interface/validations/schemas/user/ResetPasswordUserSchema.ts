import Joi from "joi";

const ResetPasswordUserSchema = Joi.object({
  password: Joi.string().min(7).required(),
});

export { ResetPasswordUserSchema };

import Joi from "joi";

const ParamsSchema = Joi.object({
  id: Joi.string().required(),
});

export { ParamsSchema };

import { Router } from "express";

import { CreateUserController } from "../../controllers/user/CreateUserController";
import { FindUserController } from "../../controllers/user/FindUserController";
import { FindManyUserController } from "../../controllers/user/FindManyUserController";
import { DeleteUserController } from "../../controllers/user/DeleteUserController";
import { AuthUserController } from "../../controllers/user/AuthUserController";
import { UpdateUserController } from "../../controllers/user/UpdateUserController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureInputValidation } from "../../middlewares/ensureInputValidation";

import { CreateUserSchema } from "../../validations/schemas/user/CreateUserSchema";
import { ParamsSchema } from "../../validations/schemas/ParamsSchema";
import { AuthUserSchema } from "../../validations/schemas/user/AuthUserSchema";
import { UpdateUserSchema } from "../../validations/schemas/user/UpdateUserSchema";
import { ChangePasswordUserController } from "../../controllers/user/ChangePasswordUserController";
import { ChangePasswordUserSchema } from "../../validations/schemas/user/ChangePasswordUserSchema";
import { ResetPasswordUserController } from "../../controllers/user/ResetPasswordUserController";
import { ResetPasswordUserSchema } from "../../validations/schemas/user/ResetPasswordUserSchema";

const routes = Router();

const createUserController = new CreateUserController();
const findUserController = new FindUserController();
const findManyUserController = new FindManyUserController();
const deleteUserController = new DeleteUserController();
const authUserController = new AuthUserController();
const updateUserController = new UpdateUserController();
const changePasswordUserController = new ChangePasswordUserController();
const resetPasswordUserControlelr = new ResetPasswordUserController();

routes.post(
  "/created",
  ensureInputValidation(CreateUserSchema, "body"),
  createUserController.handle
);
routes.get(
  "/find/:id",
  ensureAuthenticated,
  ensureInputValidation(ParamsSchema, "params"),
  findUserController.handle
);
routes.get("/findmany", ensureAuthenticated, findManyUserController.handle);
routes.delete(
  "/deleted/:id",
  ensureAuthenticated,
  ensureInputValidation(ParamsSchema, "params"),
  deleteUserController.handle
);
routes.post(
  "/login",
  ensureInputValidation(AuthUserSchema, "body"),
  authUserController.handle
);
routes.put(
  "/updated/:id",
  ensureAuthenticated,
  ensureInputValidation(ParamsSchema, "params"),
  ensureInputValidation(UpdateUserSchema, "body"),
  updateUserController.handle
);
routes.post(
  "/change-password",
  ensureInputValidation(ChangePasswordUserSchema, "body"),
  changePasswordUserController.handle
);
routes.put(
  "/reset-password/:token",
  ensureInputValidation(ResetPasswordUserSchema, "body"),
  resetPasswordUserControlelr.handle
);

export { routes as userRoutes };

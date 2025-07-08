import { Request, Response } from "express";
import { FindEmailRepository } from "../../../infrastruture/repository/FindEmailRepository";
import { SaveRepository } from "../../../infrastruture/repository/SaveRepository";
import { ChangePasswordUserUseCase } from "../../../application/usecases/user/ChangePasswordUserUseCase";

class ChangePasswordUserController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    const findEmailRepository = new FindEmailRepository();
    const saveRepository = new SaveRepository();
    const useCase = new ChangePasswordUserUseCase(
      findEmailRepository,
      saveRepository
    );

    try {
      await useCase.execute({ email });

      response.status(200).json({
        message: "if the email is correct, we'll send a password reset link.",
      });
    } catch (err: any) {
      response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { ChangePasswordUserController };

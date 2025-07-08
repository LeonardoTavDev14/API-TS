import { Request, Response } from "express";
import { FindTokenRepository } from "../../../infrastruture/repository/FindTokenRepository";
import { HashProviderRepository } from "../../../shared/providers/bcrypt/repository/hashProviderRepository";
import { SaveRepository } from "../../../infrastruture/repository/SaveRepository";
import { ResetPasswordUserUseCase } from "../../../application/usecases/user/ResetPasswordUserUseCase";

class ResetPasswordUserController {
  async handle(request: Request, response: Response) {
    const { token } = request.params;
    const { password } = request.body;

    const findTokenRepository = new FindTokenRepository();
    const hashRepository = new HashProviderRepository();
    const saveRepository = new SaveRepository();
    const useCase = new ResetPasswordUserUseCase(
      findTokenRepository,
      hashRepository,
      saveRepository
    );

    try {
      await useCase.execute({ token, password });

      response.status(200).json({
        message: "Password reset successfully!",
      });
    } catch (err: any) {
      response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { ResetPasswordUserController };

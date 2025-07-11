import { Request, Response } from "express";
import { DeleteManyRepository } from "../../../infrastruture/repository/DeleteManyRepository";
import { LogoutUserUseCase } from "../../../application/usecases/user/LogoutUserUseCase";

class LogoutUserController {
  async handle(request: Request, response: Response) {
    const userId = request.user.id;

    const deleteRepository = new DeleteManyRepository();
    const useCase = new LogoutUserUseCase(deleteRepository);

    try {
      await useCase.execute(userId);

      response.status(200).json({
        message: "You have been successfully logged out!",
      });
    } catch (err: any) {
      response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { LogoutUserController };

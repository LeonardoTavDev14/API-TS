import { Request, Response } from "express";
import { FindEmailRepository } from "../../../infrastruture/repository/FindEmailRepository";
import { CompareProviderRepository } from "../../../shared/providers/bcrypt/repository/compareProviderRepository";
import { CreateRefreshTokenRepository } from "../../../infrastruture/repository/CreateRefreshTokenRepository";
import { AuthUserUseCase } from "../../../application/usecases/user/AuthUserUseCase";
import { DeleteManyRepository } from "../../../infrastruture/repository/DeleteManyRepository";

class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const findEmailRepository = new FindEmailRepository();
    const compareRepository = new CompareProviderRepository();
    const deleteRepository = new DeleteManyRepository();
    const createRepository = new CreateRefreshTokenRepository();
    const useCase = new AuthUserUseCase(
      findEmailRepository,
      compareRepository,
      deleteRepository,
      createRepository
    );

    try {
      const auth = await useCase.execute({ email, password });

      response.status(200).json({ auth });
    } catch (err: any) {
      response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { AuthUserController };

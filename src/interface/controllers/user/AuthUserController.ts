import { Request, Response } from "express";
import { FindEmailRepository } from "../../../infrastruture/repository/FindEmailRepository";
import { CompareProviderRepository } from "../../../shared/providers/bcrypt/repository/compareProviderRepository";
import { AuthUserUseCase } from "../../../application/usecases/user/AuthUserUseCase";

class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const findEmailRepository = new FindEmailRepository();
    const compareRepository = new CompareProviderRepository();
    const useCase = new AuthUserUseCase(findEmailRepository, compareRepository);

    try {
      const token = await useCase.execute({ email, password });

      response.status(200).json(token);
    } catch (err: any) {
      response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { AuthUserController };

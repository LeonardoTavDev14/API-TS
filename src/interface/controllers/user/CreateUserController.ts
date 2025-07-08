import { Request, Response } from "express";
import { FindEmailRepository } from "../../../infrastruture/repository/FindEmailRepository";
import { HashProviderRepository } from "../../../shared/providers/bcrypt/repository/hashProviderRepository";
import { CreateRepository } from "../../../infrastruture/repository/CreateRepository";
import { CreateUserUseCase } from "../../../application/usecases/user/CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const findEmailRepository = new FindEmailRepository();
    const hashProviderRepository = new HashProviderRepository();
    const createRepository = new CreateRepository();
    const useCase = new CreateUserUseCase(
      findEmailRepository,
      hashProviderRepository,
      createRepository
    );

    try {
      const user = await useCase.execute({ name, email, password });

      response.status(201).json({ user });
    } catch (err: any) {
      response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { CreateUserController };

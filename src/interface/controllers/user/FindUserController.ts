import { Request, Response } from "express";
import { FindByIdRepository } from "../../../infrastruture/repository/FindByIdRepository";
import { FindUserUseCase } from "../../../application/usecases/user/FindUserUseCase";

class FindUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findByIdRepository = new FindByIdRepository();
    const useCase = new FindUserUseCase(findByIdRepository);

    try {
      const user = await useCase.execute({ id });

      response.status(200).json({ user });
    } catch (err: any) {
      response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { FindUserController };

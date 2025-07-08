import { Request, Response } from "express";
import { FindManyRepository } from "../../../infrastruture/repository/FindManyRepository";
import { FindManyUserUseCase } from "../../../application/usecases/user/FindManyUserUseCase";

class FindManyUserController {
  async handle(request: Request, response: Response) {
    const findManyRepository = new FindManyRepository();
    const useCase = new FindManyUserUseCase(findManyRepository);

    try {
      const users = await useCase.execute();

      response.status(200).json({ users });
    } catch (err: any) {
      response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { FindManyUserController };

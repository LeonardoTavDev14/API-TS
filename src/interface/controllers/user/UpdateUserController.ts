import { Request, Response } from "express";
import { FindByIdRepository } from "../../../infrastruture/repository/FindByIdRepository";
import { UpdateRepository } from "../../../infrastruture/repository/UpdateRepository";
import { UpdateUserUseCase } from "../../../application/usecases/user/UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email } = request.body;

    const findByIdRepository = new FindByIdRepository();
    const updateRepository = new UpdateRepository();
    const useCase = new UpdateUserUseCase(findByIdRepository, updateRepository);

    try {
      await useCase.execute({ id, name, email });

      response.status(200).json({
        message: "Information updated successfully!",
      });
    } catch (err: any) {
      response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { UpdateUserController };

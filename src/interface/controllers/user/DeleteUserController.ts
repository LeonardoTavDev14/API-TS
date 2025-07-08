import { Request, Response } from "express";
import { FindByIdRepository } from "../../../infrastruture/repository/FindByIdRepository";
import { DeleteRepository } from "../../../infrastruture/repository/DeleteRepository";
import { DeleteUserUseCase } from "../../../application/usecases/user/DeleteUserUseCase";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findByIdRepository = new FindByIdRepository();
    const deleteRepository = new DeleteRepository();
    const useCase = new DeleteUserUseCase(findByIdRepository, deleteRepository);

    try {
      await useCase.execute({ id });

      response.status(200).json({
        message: "User deleted successfully!",
      });
    } catch (err: any) {
      response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { DeleteUserController };

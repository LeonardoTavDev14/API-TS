import { Request, Response } from "express";
import { FindRepository } from "../../../infrastruture/repository/FindRepository";
import { DeleteManyRepository } from "../../../infrastruture/repository/DeleteManyRepository";
import { CreateRefreshTokenRepository } from "../../../infrastruture/repository/CreateRefreshTokenRepository";
import { RefreshTokenUseCase } from "../../../application/usecases/refresh_token/RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body;

    const findRepository = new FindRepository();
    const deleteRepository = new DeleteManyRepository();
    const createRepository = new CreateRefreshTokenRepository();
    const useCase = new RefreshTokenUseCase(
      findRepository,
      deleteRepository,
      createRepository
    );

    try {
      const tokens = await useCase.execute(refresh_token);

      response.status(200).json({ tokens });
    } catch (err: any) {
      response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { RefreshTokenController };

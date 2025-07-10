import dayjs from "dayjs";
import { RefreshToken } from "../../../domain/entities/refresh_token/RefreshToken";
import { IFindRepositories } from "../../../domain/repositories/FindRepositories";
import { IDeleteManyRepositories } from "../../../domain/repositories/DeleteManyRepositories";
import { ICreateRefreshTokenRepositories } from "../../../domain/repositories/CreateRefreshTokenRepositories";
import { IAuthResponseDTO } from "../../dtos/AuthResponseDto";
import { GenerateToken } from "../../../shared/providers/tokens/generateToken";

class RefreshTokenUseCase {
  constructor(
    private findRepository: IFindRepositories,
    private deleteRepository: IDeleteManyRepositories,
    private createRepository: ICreateRefreshTokenRepositories
  ) {}

  async execute(id: string): Promise<string | IAuthResponseDTO> {
    const refresh_token = await this.findRepository.find(id);

    if (!refresh_token) {
      throw new Error("Refresh token invalid!");
    }

    const refreshTokenExpired = dayjs().isAfter(refresh_token.expiredIn);

    const generateToken = new GenerateToken();
    const token = await generateToken.execute(refresh_token.userId);

    if (refreshTokenExpired) {
      await this.deleteRepository.deleteMany(refresh_token.userId);

      const expiredIn = dayjs().add(30, "second").toDate();

      const created = new RefreshToken(expiredIn, refresh_token.userId);

      const refreshToken = await this.createRepository.create({
        expiredIn,
        userId: refresh_token.userId,
        id: created.id,
      });

      return { token, refreshToken };
    }

    return token;
  }
}

export { RefreshTokenUseCase };

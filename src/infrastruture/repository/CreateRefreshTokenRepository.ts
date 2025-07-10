import { ICreateRefreshTokenRepositories } from "../../domain/repositories/CreateRefreshTokenRepositories";
import { prismaClient } from "../prisma/db";
import { RefreshToken } from "../../domain/entities/refresh_token/RefreshToken";

class CreateRefreshTokenRepository implements ICreateRefreshTokenRepositories {
  async create(refresh_token: RefreshToken): Promise<RefreshToken> {
    const refreshToken = await prismaClient.refreshToken.create({
      data: {
        expiredIn: refresh_token.expiredIn,
        userId: refresh_token.userId,
      },
    });

    return new RefreshToken(
      refreshToken.expiredIn,
      refreshToken.userId,
      refreshToken.id
    );
  }
}

export { CreateRefreshTokenRepository };

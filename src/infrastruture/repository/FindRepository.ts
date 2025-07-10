import { IFindRepositories } from "../../domain/repositories/FindRepositories";
import { prismaClient } from "../prisma/db";
import { RefreshToken } from "../../domain/entities/refresh_token/RefreshToken";

class FindRepository implements IFindRepositories {
  async find(id: string): Promise<RefreshToken | null> {
    const refresh_token = await prismaClient.refreshToken.findFirst({
      where: {
        id,
      },
    });

    if (!refresh_token) {
      return null;
    }

    return new RefreshToken(
      refresh_token.expiredIn,
      refresh_token.userId,
      refresh_token.id
    );
  }
}

export { FindRepository };

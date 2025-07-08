import { User } from "../../domain/entities/user/User";
import { IFindTokenRepositories } from "../../domain/repositories/FindTokenRepositories";
import { prismaClient } from "../prisma/db";

class FindTokenRepository implements IFindTokenRepositories {
  async findToken(token: string): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: {
        resetToken: token,
      },
    });

    if (!user) {
      return null;
    }

    return new User(
      user.name,
      user.email,
      user.password,
      user.id,
      user.resetToken,
      user.resetExpiredToken
    );
  }
}

export { FindTokenRepository };

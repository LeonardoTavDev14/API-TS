import { User } from "../../domain/entities/user/User";
import { ISaveRepositories } from "../../domain/repositories/saveRepositories";
import { prismaClient } from "../prisma/db";

class SaveRepository implements ISaveRepositories {
  async save(user: User): Promise<void> {
    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: user.password,
        resetToken: user.resetToken,
        resetExpiredToken: user.resetExpiredToken,
      },
    });
  }
}

export { SaveRepository };

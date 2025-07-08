import { User } from "../../domain/entities/user/User";
import { IUpdateRepositories } from "../../domain/repositories/UpdateRepositories";
import { prismaClient } from "../prisma/db";

class UpdateRepository implements IUpdateRepositories {
  async update(user: User): Promise<User> {
    const updated = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
      },
    });

    return new User(updated.name, updated.email, updated.password, updated.id);
  }
}

export { UpdateRepository };

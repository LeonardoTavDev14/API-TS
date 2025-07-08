import { User } from "../../domain/entities/user/User";
import { IFindByIdRepositories } from "../../domain/repositories/FindByIdRepositories";
import { prismaClient } from "../prisma/db";

class FindByIdRepository implements IFindByIdRepositories {
  async findById(id: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return new User(user.name, user.email, user.password, user.id);
  }
}

export { FindByIdRepository };

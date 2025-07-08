import { User } from "../../domain/entities/user/User";
import { IFindManyRepositories } from "../../domain/repositories/FindManyRepositories";
import { prismaClient } from "../prisma/db";

class FindManyRepository implements IFindManyRepositories {
  async findMany(): Promise<User[] | null> {
    const users = await prismaClient.user.findMany();

    if (!users.length) {
      return null;
    }

    return users.map(
      (user) =>
        new User(
          user.name,
          user.email,
          user.password,
          user.id,
          user.resetToken,
          user.resetExpiredToken
        )
    );
  }
}

export { FindManyRepository };

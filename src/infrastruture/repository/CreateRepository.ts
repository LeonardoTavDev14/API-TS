import { User } from "../../domain/entities/user/User";
import { ICreateRepositories } from "../../domain/repositories/CreateRepositories";
import { prismaClient } from "../prisma/db";

class CreateRepository implements ICreateRepositories {
  async create(user: User): Promise<User> {
    const created = await prismaClient.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        resetToken: null,
        resetExpiredToken: null,
      },
    });

    return new User(created.name, created.email, created.password, created.id);
  }
}

export { CreateRepository };

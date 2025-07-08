import { User } from "../../domain/entities/user/User";
import { IFindEmailRepositories } from "../../domain/repositories/FindEmailRepositories";
import { prismaClient } from "../prisma/db";

class FindEmailRepository implements IFindEmailRepositories {
  async findEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return null;
    }

    return new User(user.name, user.email, user.password, user.id);
  }
}

export { FindEmailRepository };

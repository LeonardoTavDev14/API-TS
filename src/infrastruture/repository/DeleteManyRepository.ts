import { IDeleteManyRepositories } from "../../domain/repositories/DeleteManyRepositories";
import { prismaClient } from "../prisma/db";

class DeleteManyRepository implements IDeleteManyRepositories {
  async deleteMany(id: string): Promise<void> {
    await prismaClient.refreshToken.deleteMany({
      where: {
        userId: id,
      },
    });
  }
}

export { DeleteManyRepository };

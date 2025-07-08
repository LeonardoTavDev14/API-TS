import { IDeleteRepositories } from "../../domain/repositories/DeleteRepositories";
import { prismaClient } from "../prisma/db";

class DeleteRepository implements IDeleteRepositories {
  async delete(id: string): Promise<void> {
    await prismaClient.user.delete({
      where: { id },
    });
  }
}

export { DeleteRepository };

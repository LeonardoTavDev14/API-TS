import { IDeleteManyRepositories } from "../../../domain/repositories/DeleteManyRepositories";

class LogoutUserUseCase {
  constructor(private deleteRepository: IDeleteManyRepositories) {}

  async execute(id: string): Promise<void> {
    return await this.deleteRepository.deleteMany(id);
  }
}

export { LogoutUserUseCase };

import { IFindByIdRepositories } from "../../../domain/repositories/FindByIdRepositories";
import { IDeleteRepositories } from "../../../domain/repositories/DeleteRepositories";
import { IFindUserDTO } from "../../dtos/FindUserDto";

class DeleteUserUseCase {
  constructor(
    private findByIdRepository: IFindByIdRepositories,
    private deleteRepository: IDeleteRepositories
  ) {}

  async execute({ id }: IFindUserDTO): Promise<void> {
    const user = await this.findByIdRepository.findById(id);

    if (!user) {
      throw new Error("User not found!");
    }

    return await this.deleteRepository.delete(id);
  }
}

export { DeleteUserUseCase };

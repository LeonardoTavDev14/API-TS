import { IFindByIdRepositories } from "../../../domain/repositories/FindByIdRepositories";
import { IUpdateRepositories } from "../../../domain/repositories/UpdateRepositories";
import { IUpdateUserDTO } from "../../dtos/UpdateUserDto";
import { User } from "../../../domain/entities/user/User";

class UpdateUserUseCase {
  constructor(
    private findByIdRepository: IFindByIdRepositories,
    private updateRepository: IUpdateRepositories
  ) {}

  async execute({ id, name, email }: IUpdateUserDTO): Promise<User> {
    const user = await this.findByIdRepository.findById(id);

    if (!user) {
      throw new Error("User not found!");
    }

    const updated = new User(
      name ?? user.name,
      email ?? user.email,
      user.password,
      user.id
    );

    return await this.updateRepository.update(updated);
  }
}

export { UpdateUserUseCase };

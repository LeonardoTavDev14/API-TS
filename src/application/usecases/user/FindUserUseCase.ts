import { User } from "../../../domain/entities/user/User";
import { IFindByIdRepositories } from "../../../domain/repositories/FindByIdRepositories";
import { IFindUserDTO } from "../../dtos/FindUserDto";

class FindUserUseCase {
  constructor(private findByIdRepository: IFindByIdRepositories) {}

  async execute({ id }: IFindUserDTO): Promise<User> {
    const user = await this.findByIdRepository.findById(id);

    if (!user) {
      throw new Error("User not found!");
    }

    return new User(user.name, user.email, user.password, user.id);
  }
}

export { FindUserUseCase };

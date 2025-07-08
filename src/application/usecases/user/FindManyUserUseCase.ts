import { User } from "../../../domain/entities/user/User";
import { IFindManyRepositories } from "../../../domain/repositories/FindManyRepositories";

class FindManyUserUseCase {
  constructor(private findManyRepository: IFindManyRepositories) {}

  async execute(): Promise<Array<User>> {
    const users = await this.findManyRepository.findMany();

    if (!users?.length) {
      throw new Error("Users not found!");
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

export { FindManyUserUseCase };

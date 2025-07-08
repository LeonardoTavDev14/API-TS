import { IFindEmailRepositories } from "../../../domain/repositories/FindEmailRepositories";
import { ICreateRepositories } from "../../../domain/repositories/CreateRepositories";
import { IHashProviderRepositories } from "../../../shared/providers/bcrypt/repositories/hashProvider";
import { User } from "../../../domain/entities/user/User";
import { ICreateUserDTO } from "../../dtos/CreateUserDto";

class CreateUserUseCase {
  constructor(
    private findEmailRepository: IFindEmailRepositories,
    private hashRepository: IHashProviderRepositories,
    private createRepository: ICreateRepositories
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = await this.findEmailRepository.findEmail(email);

    if (user) {
      throw new Error("This email is already registered!");
    }

    const hashedPassword = await this.hashRepository.hash(password);

    const created = new User(name, email, hashedPassword);

    return await this.createRepository.create(created);
  }
}

export { CreateUserUseCase };

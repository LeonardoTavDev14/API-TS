import { User } from "../../../domain/entities/user/User";
import { IFindTokenRepositories } from "../../../domain/repositories/FindTokenRepositories";
import { ISaveRepositories } from "../../../domain/repositories/saveRepositories";
import { IHashProviderRepositories } from "../../../shared/providers/bcrypt/repositories/hashProvider";
import { IResetPasswordUserDTO } from "../../dtos/ResetPasswordUserDto";
import dayjs from "dayjs";

class ResetPasswordUserUseCase {
  constructor(
    private findTokenRepository: IFindTokenRepositories,
    private hashRepository: IHashProviderRepositories,
    private saveRepository: ISaveRepositories
  ) {}
  async execute({
    token,
    password,
  }: IResetPasswordUserDTO): Promise<User | void> {
    const user = await this.findTokenRepository.findToken(token);

    if (!user) {
      throw new Error("Expired or invalid link");
    }

    const resetTokenExpired = dayjs().isAfter(user.resetExpiredToken);

    if (resetTokenExpired) {
      throw new Error("Expired or invalid link");
    }

    const newHashedPassword = await this.hashRepository.hash(password);
    const resetToken = null;
    const resetExpiredToken = null;

    const saved = new User(
      user.name,
      user.email,
      newHashedPassword,
      user.id,
      resetToken,
      resetExpiredToken
    );

    return await this.saveRepository.save(saved);
  }
}

export { ResetPasswordUserUseCase };

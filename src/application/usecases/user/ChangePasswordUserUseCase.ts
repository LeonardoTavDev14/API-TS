import { IFindEmailRepositories } from "../../../domain/repositories/FindEmailRepositories";
import { ISaveRepositories } from "../../../domain/repositories/saveRepositories";
import { sendingMail } from "../../../shared/providers/mail/sendingMail";
import { generateResetToken } from "../../../shared/providers/tokens/generateResetToken";
import dayjs from "dayjs";
import { IChangePasswordUserDto } from "../../dtos/ChangePasswordUserDto";
import { User } from "../../../domain/entities/user/User";

class ChangePasswordUserUseCase {
  constructor(
    private findEmailRepository: IFindEmailRepositories,
    private saveRepository: ISaveRepositories
  ) {}

  async execute({ email }: IChangePasswordUserDto): Promise<void> {
    const user = await this.findEmailRepository.findEmail(email);

    if (!user) {
      throw new Error(
        "if the email is correct, we'll send a password reset link."
      );
    }

    const resetToken = generateResetToken();
    const resetExpiredToken = dayjs().add(1, "hour").toDate();

    const saved = new User(
      user.name,
      email,
      user.password,
      user.id,
      resetToken,
      resetExpiredToken
    );

    await this.saveRepository.save(saved);

    await sendingMail(user.name, email, resetToken);
  }
}

export { ChangePasswordUserUseCase };

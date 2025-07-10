import { IFindEmailRepositories } from "../../../domain/repositories/FindEmailRepositories";
import { ICompareProviderRepositories } from "../../../shared/providers/bcrypt/repositories/compareProviderRepositories";
import { IAuthUserDTO } from "../../dtos/AuthUserDto";
import { IDeleteManyRepositories } from "../../../domain/repositories/DeleteManyRepositories";
import { GenerateToken } from "../../../shared/providers/tokens/generateToken";
import { ICreateRefreshTokenRepositories } from "../../../domain/repositories/CreateRefreshTokenRepositories";
import dayjs from "dayjs";
import { RefreshToken } from "../../../domain/entities/refresh_token/RefreshToken";
import { IAuthResponseDTO } from "../../dtos/AuthResponseDto";

class AuthUserUseCase {
  constructor(
    private findEmailRepository: IFindEmailRepositories,
    private compareRepository: ICompareProviderRepositories,
    private deleteRepository: IDeleteManyRepositories,
    private createRepository: ICreateRefreshTokenRepositories
  ) {}

  async execute({ email, password }: IAuthUserDTO): Promise<IAuthResponseDTO> {
    const user = await this.findEmailRepository.findEmail(email);

    if (!user) {
      throw new Error("E-mail or password incorrect!");
    }

    const matchPassword = await this.compareRepository.compare(
      password,
      user.password
    );

    if (!matchPassword) {
      throw new Error("E-mail or password incorrect!");
    }

    const generateToken = new GenerateToken();

    const token = await generateToken.execute(user.id as string);

    await this.deleteRepository.deleteMany(user.id as string);

    const expiredIn = dayjs().add(5, "minutes").toDate();

    const created = new RefreshToken(expiredIn, user.id as string);

    const refreshToken = await this.createRepository.create({
      expiredIn,
      userId: user.id as string,
      id: created.id,
    });

    return { token, refreshToken };
  }
}

export { AuthUserUseCase };

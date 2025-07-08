import { IFindEmailRepositories } from "../../../domain/repositories/FindEmailRepositories";
import { ICompareProviderRepositories } from "../../../shared/providers/bcrypt/repositories/compareProviderRepositories";
import { IAuthUserDTO } from "../../dtos/AuthUserDto";
import { GenerateToken } from "../../../shared/providers/tokens/generateToken";
import { IAuthResponseDTO } from "../../dtos/AuthResponseDto";

class AuthUserUseCase {
  constructor(
    private findEmailRepository: IFindEmailRepositories,
    private compareRepository: ICompareProviderRepositories
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

    return token;
  }
}

export { AuthUserUseCase };

import { User } from "../entities/user/User";

export interface IFindEmailRepositories {
  findEmail(email: string): Promise<User | null>;
}

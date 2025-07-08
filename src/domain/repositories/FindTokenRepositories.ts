import { User } from "../entities/user/User";

export interface IFindTokenRepositories {
  findToken(token: string): Promise<User | null>;
}

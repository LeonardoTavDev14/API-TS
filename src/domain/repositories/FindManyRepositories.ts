import { User } from "../entities/user/User";

export interface IFindManyRepositories {
  findMany(): Promise<Array<User> | null>;
}

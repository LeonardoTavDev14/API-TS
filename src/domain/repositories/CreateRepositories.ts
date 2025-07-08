import { User } from "../entities/user/User";

export interface ICreateRepositories {
  create(user: User): Promise<User>;
}

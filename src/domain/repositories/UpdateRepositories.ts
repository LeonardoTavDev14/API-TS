import { User } from "../entities/user/User";

export interface IUpdateRepositories {
  update(user: User): Promise<User>;
}

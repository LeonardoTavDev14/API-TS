import { User } from "../entities/user/User";

export interface ISaveRepositories {
  save(user: User): Promise<void>;
}

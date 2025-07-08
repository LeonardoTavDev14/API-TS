import { User } from "../entities/user/User";

export interface IFindByIdRepositories {
  findById(id: string): Promise<User | null>;
}

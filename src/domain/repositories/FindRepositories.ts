import { RefreshToken } from "../entities/refresh_token/RefreshToken";

export interface IFindRepositories {
  find(id: string): Promise<RefreshToken | null>;
}

import { RefreshToken } from "../entities/refresh_token/RefreshToken";

export interface ICreateRefreshTokenRepositories {
  create(refresh_token: RefreshToken): Promise<RefreshToken>;
}

import { RefreshToken } from "../../domain/entities/refresh_token/RefreshToken";

export interface IAuthResponseDTO {
  token: string;
  refreshToken: RefreshToken;
}

import jwt from "jsonwebtoken";
import { IAuthResponseDTO } from "../../../application/dtos/AuthResponseDto";
import dotenv from "dotenv";
dotenv.config();

class GenerateToken {
  async execute(id: string): Promise<IAuthResponseDTO> {
    const token = jwt.sign({}, `${process.env.SECRETJWT}`, {
      subject: id,
      expiresIn: 300,
    });

    return { token };
  }
}

export { GenerateToken };

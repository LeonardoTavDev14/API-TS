import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class GenerateToken {
  async execute(id: string): Promise<string> {
    const token = jwt.sign({}, `${process.env.SECRETJWT}`, {
      subject: id,
      expiresIn: "1m",
    });

    return token;
  }
}

export { GenerateToken };

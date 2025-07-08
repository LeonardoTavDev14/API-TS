import { compare } from "bcryptjs";
import { ICompareProviderRepositories } from "../repositories/compareProviderRepositories";

class CompareProviderRepository implements ICompareProviderRepositories {
  async compare(data: string, hashed: string): Promise<boolean> {
    return await compare(data, hashed);
  }
}

export { CompareProviderRepository };

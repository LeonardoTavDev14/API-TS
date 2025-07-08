import { hash } from "bcryptjs";
import { IHashProviderRepositories } from "../repositories/hashProvider";

class HashProviderRepository implements IHashProviderRepositories {
  async hash(data: string): Promise<string> {
    return await hash(data, 12);
  }
}

export { HashProviderRepository };

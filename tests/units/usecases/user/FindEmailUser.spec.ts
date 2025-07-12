import { test, expect, describe, beforeAll } from "vitest";
import { FindEmailRepository } from "../../../../src/infrastruture/repository/FindEmailRepository";
import { HashProviderRepository } from "../../../../src/shared/providers/bcrypt/repository/hashProviderRepository";
import { CreateRepository } from "../../../../src/infrastruture/repository/CreateRepository";
import { CreateUserUseCase } from "../../../../src/application/usecases/user/CreateUserUseCase";

let useCase: CreateUserUseCase;

beforeAll(() => {
  const findEmailRepository = new FindEmailRepository();
  const hashProviderRepository = new HashProviderRepository();
  const createRepository = new CreateRepository();

  useCase = new CreateUserUseCase(
    findEmailRepository,
    hashProviderRepository,
    createRepository
  );
});

describe("Find email - Users", () => {
  test("The result of this test should be an exception", () => {
    expect(async () => {
      await useCase.execute({
        name: "Leonardo",
        email: "leonardoarrais211@gmail.com",
        password: "123123123",
      });
    }).rejects.toThrow("This email is already registered!");
  });
});

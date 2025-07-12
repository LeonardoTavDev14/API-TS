import { test, expect, describe, beforeAll } from "vitest";
import { AuthUserUseCase } from "../../../../src/application/usecases/user/AuthUserUseCase";
import { FindEmailRepository } from "../../../../src/infrastruture/repository/FindEmailRepository";
import { CompareProviderRepository } from "../../../../src/shared/providers/bcrypt/repository/compareProviderRepository";
import { DeleteManyRepository } from "../../../../src/infrastruture/repository/DeleteManyRepository";
import { CreateRefreshTokenRepository } from "../../../../src/infrastruture/repository/CreateRefreshTokenRepository";

let useCase: AuthUserUseCase;

beforeAll(() => {
  const findEmailRepository = new FindEmailRepository();
  const compareRepository = new CompareProviderRepository();
  const deleteRepository = new DeleteManyRepository();
  const createRepository = new CreateRefreshTokenRepository();

  useCase = new AuthUserUseCase(
    findEmailRepository,
    compareRepository,
    deleteRepository,
    createRepository
  );
});

describe("Use cases - Auth User", () => {
  test("Must return two tokens", async () => {
    const result = await useCase.execute({
      email: "matheus@gmail.com",
      password: "123123123",
    });

    expect(typeof result.token).toBe("string");
    expect(result.refreshToken).toBeTypeOf("object");
  });
});

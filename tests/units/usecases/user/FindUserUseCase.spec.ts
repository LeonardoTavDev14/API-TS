import { test, expect, describe, beforeAll } from "vitest";
import { FindUserUseCase } from "../../../../src/application/usecases/user/FindUserUseCase";
import { FindByIdRepository } from "../../../../src/infrastruture/repository/FindByIdRepository";
import { User } from "../../../../src/domain/entities/user/User";

let useCase: FindUserUseCase;

beforeAll(() => {
  const findByIdRepository = new FindByIdRepository();

  useCase = new FindUserUseCase(findByIdRepository);
});

describe("Use cases - Find User", () => {
  test("Must return a user", async () => {
    const userId = "686c5fe317041348cba7c5df";
    const result = await useCase.execute({
      id: userId,
    });

    const user = new User(
      result.name,
      result.email,
      result.password,
      result.id,
      result.resetToken,
      result.resetExpiredToken
    );

    expect(typeof user.name).toBe("string");
    expect(typeof user.email).toBe("string");
    expect(user.password.length > 6).toBe(true);
    expect(typeof user.id).toBe("string");
  });
});

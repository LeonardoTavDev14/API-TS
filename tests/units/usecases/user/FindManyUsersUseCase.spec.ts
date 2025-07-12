import { test, expect, describe, beforeAll } from "vitest";
import { FindManyUserUseCase } from "../../../../src/application/usecases/user/FindManyUserUseCase";
import { FindManyRepository } from "../../../../src/infrastruture/repository/FindManyRepository";

let useCase: FindManyUserUseCase;

beforeAll(() => {
  const findRepository = new FindManyRepository();
  useCase = new FindManyUserUseCase(findRepository);
});

describe("Find many - Users", () => {
  test("Should return a list of users or null", async () => {
    const result = await useCase.execute();

    expect(result).toBeTypeOf("object");
  });
});

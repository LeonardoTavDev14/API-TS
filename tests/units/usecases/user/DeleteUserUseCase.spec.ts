import { test, expect, describe, beforeAll } from "vitest";
import { DeleteUserUseCase } from "../../../../src/application/usecases/user/DeleteUserUseCase";
import { FindByIdRepository } from "../../../../src/infrastruture/repository/FindByIdRepository";
import { DeleteRepository } from "../../../../src/infrastruture/repository/DeleteRepository";

let useCase: DeleteUserUseCase;

beforeAll(() => {
  const findByIdRepository = new FindByIdRepository();
  const deleteRepository = new DeleteRepository();

  useCase = new DeleteUserUseCase(findByIdRepository, deleteRepository);
});

describe("Use cases - Delete User", () => {
  test("The user must be deleted", async () => {
    const userId = "68719c6c4e0ff3c28db60766";
    const result = await useCase.execute({
      id: userId,
    });

    expect(result).toBeUndefined();
  });
});

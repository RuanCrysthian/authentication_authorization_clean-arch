import { Sequelize } from "sequelize-typescript";
import UserFactory from "../../domain/factory/user.factory";
import UserModel from "../../infra/repository/sequelize/user.model";
import UserRepository from "../../infra/repository/sequelize/user.repository.sequelize";
import UpdateUserUseCase from "./update.user.usecase";

describe("Update User Use Case Tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([UserModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update an user", async () => {
    const userRepository = new UserRepository();
    const user = UserFactory.create(
      "John Doe",
      "john@email.com",
      "@QAZ123qaz",
      "admin"
    );
    await userRepository.save(user);
    const useCase = new UpdateUserUseCase(userRepository);
    const input = {
      id: user.id,
      name: "Jane Doe",
      email: "test@email.com",
    };

    const output = await useCase.execute(input);

    expect(output.id).toBe(input.id);
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
    expect(output.role).toBe(user.role);
    expect(output.createdAt).toStrictEqual(user.createdAt);
  });

  it("should throw an error when user not found", async () => {
    const userRepository = new UserRepository();
    const useCase = new UpdateUserUseCase(userRepository);
    const input = { id: "123", name: "Jane Doe", email: "test@email.com" };
    await expect(async () => {
      await useCase.execute(input);
    }).rejects.toThrow("User not found");
  });
});

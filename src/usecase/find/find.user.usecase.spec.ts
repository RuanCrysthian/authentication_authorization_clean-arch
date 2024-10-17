import { Sequelize } from "sequelize-typescript";
import UserFactory from "../../domain/factory/user.factory";
import UserModel from "../../infra/repository/sequelize/user.model";
import UserRepository from "../../infra/repository/sequelize/user.repository.sequelize";
import FindUserUseCase from "./find.user.usecase";

describe("Find User Use Case Tests", () => {
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

  it("should find an user by id", async () => {
    const userRepository = new UserRepository();
    const useCase = new FindUserUseCase(userRepository);
    const user = UserFactory.create(
      "John Doe",
      "test@email.com",
      "@QAZ123qaz",
      "admin"
    );
    await userRepository.save(user);

    const input = {
      id: user.id,
    };

    const output = await useCase.execute(input);
    expect(output).toStrictEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  });

  it("should throw an error if the user does not exist", async () => {
    const userRepository = new UserRepository();
    const useCase = new FindUserUseCase(userRepository);

    const input = {
      id: "123",
    };

    await expect(useCase.execute(input)).rejects.toThrow("User not found");
  });
});

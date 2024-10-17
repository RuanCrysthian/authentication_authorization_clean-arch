import { Sequelize } from "sequelize-typescript";
import UserFactory from "../../domain/factory/user.factory";
import UserModel from "../../infra/repository/sequelize/user.model";
import UserRepository from "../../infra/repository/sequelize/user.repository.sequelize";
import DeleteUserUseCase from "./delete.user.usecase";

describe("Delete User Use Case Tests", () => {
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

  it("should delete an user", async () => {
    const user1 = UserFactory.create(
      "John Doe",
      "john@email.com",
      "@QAZ123qaz",
      "admin"
    );
    const user2 = UserFactory.create(
      "Jane Doe",
      "jane@email.com",
      "@QAZ123qaz",
      "user"
    );
    const userRepositoy = new UserRepository();
    await userRepositoy.save(user1);
    await userRepositoy.save(user2);
    const useCase = new DeleteUserUseCase(userRepositoy);

    const input = { id: user1.id };

    await useCase.execute(input);

    const users = await userRepositoy.list();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe("Jane Doe");
  });

  it("should throw an error when user not found", async () => {
    const userRepositoy = new UserRepository();
    const useCase = new DeleteUserUseCase(userRepositoy);

    const input = { id: "123" };

    await expect(useCase.execute(input)).rejects.toThrow("User not found");
  });
});

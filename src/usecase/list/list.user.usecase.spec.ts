import { Sequelize } from "sequelize-typescript";
import UserFactory from "../../domain/factory/user.factory";
import UserModel from "../../infra/repository/sequelize/user.model";
import UserRepository from "../../infra/repository/sequelize/user.repository.sequelize";
import ListUserUseCase from "./list.user.usecase";

describe("List User Use Case Test", () => {
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

  it("should list all users", async () => {
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
    const useCase = new ListUserUseCase(userRepositoy);

    const result = await useCase.execute({});
    expect(result.users).toHaveLength(2);
    expect(result.users[0].name).toBe("John Doe");
    expect(result.users[1].name).toBe("Jane Doe");
  });
});

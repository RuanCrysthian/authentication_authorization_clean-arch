import { Sequelize } from "sequelize-typescript";
import EventDispatcher from "../../domain/event/event.dispatcher";
import UserModel from "../../infra/repository/sequelize/user.model";
import UserRepository from "../../infra/repository/sequelize/user.repository.sequelize";
import SaveUserUseCase from "./save.user.usecase";

describe("Save user use case test", () => {
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

  it("should create a new user", async () => {
    const userRepository = new UserRepository();
    const eventDispatcher = new EventDispatcher();
    const usecase = new SaveUserUseCase(userRepository, eventDispatcher);
    const input = {
      name: "John Doe",
      email: "test@email.com",
      password: "@QAZ123qaz",
      role: "user",
    };

    const output = await usecase.execute(input);

    const userModel = await UserModel.findOne({ where: { id: output.id } });
    expect(userModel).not.toBeNull();
    expect(userModel.password).not.toBe(input.password);

    expect(output).toStrictEqual({
      id: userModel.id,
      name: userModel.name,
      email: userModel.email,
      role: userModel.role,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
    });
  });
});

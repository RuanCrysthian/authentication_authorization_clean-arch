import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize-typescript";
import UserModel from "../../infra/repository/sequelize/user.model";
import UserRepository from "../../infra/repository/sequelize/user.repository.sequelize";
import SaveUserUseCase from "../save/save.user.usecase";
import LoginUseCase from "./login.user.usecase";
import { InputLoginUserDto } from "./login.user.usecase.dto";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("Test Login User UseCase", () => {
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

  it("should make login when email and password is correct and return token JWT", async () => {
    const userRepository = new UserRepository();
    const loginUseCase = new LoginUseCase(userRepository);
    const saveUserUseCase = new SaveUserUseCase(userRepository);

    const inputSaveUser = {
      name: "John Doe",
      email: "test@email.com",
      password: "@QAZ123qaz",
      role: "user",
    };

    await saveUserUseCase.execute(inputSaveUser);
    const user = await userRepository.findByEmail(inputSaveUser.email);

    (jwt.sign as jest.Mock).mockReturnValue("fakeToken");

    const input: InputLoginUserDto = {
      email: "test@email.com",
      password: "@QAZ123qaz",
    };

    const result = await loginUseCase.execute(input);

    expect(result).toEqual({
      token: "fakeToken",
    });
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
  });

  it("it should throw error when user not found", async () => {
    const userRepository = new UserRepository();
    const loginUseCase = new LoginUseCase(userRepository);
    const input: InputLoginUserDto = {
      email: "invalid@example.com",
      password: "@QAZ123qaz",
    };

    await expect(loginUseCase.execute(input)).rejects.toThrow("User not found");
  });

  it("it should throw error when password is incorrect", async () => {
    const userRepository = new UserRepository();
    const loginUseCase = new LoginUseCase(userRepository);
    const saveUserUseCase = new SaveUserUseCase(userRepository);

    const inputSaveUser = {
      name: "John Doe",
      email: "test@email.com",
      password: "@QAZ123qaz",
      role: "user",
    };

    await saveUserUseCase.execute(inputSaveUser);
    const input = {
      email: "test@email.com",
      password: "wrongPassword",
    };

    await expect(loginUseCase.execute(input)).rejects.toThrow(
      "Invalid password"
    );
  });

  it("it should throw error when user not found", async () => {});
});

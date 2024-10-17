import { Sequelize } from "sequelize-typescript";
import UserFactory from "../../../domain/factory/user.factory";
import UserModel from "./user.model";
import UserRepository from "./user.repository.sequelize";

describe("User repository unit tests", () => {
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

  it("should create an new user", async () => {
    const userRepository = new UserRepository();
    const user = UserFactory.create(
      "John Doe",
      "test@email.com",
      "@QAZ123qaz",
      "user"
    );
    await userRepository.save(user);

    const userModel = await UserModel.findOne({ where: { id: user.id } });
    expect(userModel.toJSON()).toStrictEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
    });
  });

  it("should throw an error if the email already exists", async () => {
    const userRepository = new UserRepository();
    const user = UserFactory.create(
      "John Doe",
      "test@email.com",
      "@QAZ123qaz",
      "user"
    );
    await userRepository.save(user);

    const user2 = UserFactory.create(
      "John",
      "test@email.com",
      "@QAZ123qaz",
      "user"
    );
    await expect(userRepository.save(user2)).rejects.toThrow(
      "Email already exists"
    );
  });

  it("should find a user by id", async () => {
    const userRepository = new UserRepository();
    const user = UserFactory.create(
      "John Doe",
      "test@email.com",
      "@QAZ123qaz",
      "user"
    );
    await userRepository.save(user);

    const userFound = await userRepository.findById(user.id);
    expect(userFound).toStrictEqual(user);
  });

  it("should throw an error if the user is not found", async () => {
    const userRepository = new UserRepository();
    await expect(userRepository.findById("1")).rejects.toThrow(
      "User not found"
    );
  });

  it("should find a user by email", async () => {
    const userRepository = new UserRepository();
    const user = UserFactory.create(
      "John Doe",
      "test@email.com",
      "@QAZ123qaz",
      "user"
    );
    await userRepository.save(user);

    const userFound = await userRepository.findByEmail(user.email);
    expect(userFound).toStrictEqual(user);
  });

  it("should throw an error if the user is not found by email", async () => {
    const userRepository = new UserRepository();
    await expect(userRepository.findByEmail("1")).rejects.toThrow(
      "User not found"
    );
  });

  it("should list all users", async () => {
    const userRepository = new UserRepository();
    const user1 = UserFactory.create(
      "John Doe",
      "test@email.com",
      "@QAZ123qaz",
      "user"
    );
    await userRepository.save(user1);
    const user2 = UserFactory.create(
      "John Doe",
      "test2@email.com",
      "@QAZ123qaz",
      "user"
    );
    await userRepository.save(user2);

    const users = await userRepository.list();

    expect(users.length).toBe(2);
    expect(users).toStrictEqual([user1, user2]);
  });

  it("should update an user", async () => {
    const userRepository = new UserRepository();
    const user = UserFactory.create(
      "John Doe",
      "est2@email.com",
      "@QAZ123qaz",
      "user"
    );
    await userRepository.save(user);
    user.changeName("John");
    user.changeEmail("t@t.com");
    user.changeRole("admin");
    await userRepository.update(user);

    const userUpdated = await UserModel.findOne({
      where: { id: user.id },
    });

    expect(userUpdated.toJSON()).toStrictEqual(
      expect.objectContaining({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      })
    );
    expect(new Date(userUpdated.updatedAt).getTime()).toBeGreaterThan(
      new Date(user.createdAt).getTime()
    );
  });

  it("should throw an error if the user is not found to update", async () => {
    const userRepository = new UserRepository();
    const user = UserFactory.create(
      "John Doe",
      "t@t.com",
      "@QAZ123qaz",
      "user"
    );
    expect(async () => {
      await userRepository.update(user);
    }).rejects.toThrow("User not found");
  });

  it("should throw an error if email already exists when updating", async () => {
    const userRepository = new UserRepository();
    const user = UserFactory.create(
      "John Doe",
      "test@email.com",
      "@QAZ123qaz",
      "user"
    );
    await userRepository.save(user);

    const duplicateUser = UserFactory.create(
      "Jane Doe",
      "test1@email.com",
      "@QAZ123qaz",
      "user"
    );
    await userRepository.save(duplicateUser);

    duplicateUser.changeEmail(user.email);
    await expect(userRepository.update(duplicateUser)).rejects.toThrow(
      "Email already exists"
    );
  });

  it("should delete an user", async () => {
    const userRepository = new UserRepository();
    const user = UserFactory.create(
      "John Doe",
      "t@t.com",
      "@QAZ123qaz",
      "user"
    );
    await userRepository.save(user);

    await userRepository.delete(user.id);

    const userDeleted = await UserModel.findOne({
      where: { id: user.id },
    });
    expect(userDeleted).toBeNull();
  });

  it("should throw an error if the user is not found to delete", async () => {
    const userRepository = new UserRepository();
    expect(async () => {
      await userRepository.delete("1");
    }).rejects.toThrow("User not found");
  });
});

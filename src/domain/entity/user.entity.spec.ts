import bcrypt from "bcryptjs";
import User from "./user.entity";

describe("User entity unit tests", () => {
  it("should throw an error if the user ID is not provided", () => {
    expect(() => {
      const user = new User(
        "",
        "John Doe",
        "test@email.com",
        "@QAZ123qaz",
        "user",
        new Date(),
        new Date()
      );
    }).toThrow("User ID is required");
  });

  it("should throw an error if the user name is not provided", () => {
    expect(() => {
      const user = new User(
        "1",
        "",
        "test@email.com",
        "@QAZ123qaz",
        "user",
        new Date(),
        new Date()
      );
    }).toThrow("User name is required");
  });

  it("should throw an error if the user email is not provided", () => {
    expect(() => {
      const user = new User(
        "1",
        "John Doe",
        "",
        "@QAZ123qaz",
        "user",
        new Date(),
        new Date()
      );
    }).toThrow("User email is required");
  });

  it("should throw an error if the user email is invalid", () => {
    expect(() => {
      const user = new User(
        "1",
        "John Doe",
        "testemail.com",
        "@QAZ123qaz",
        "user",
        new Date(),
        new Date()
      );
    }).toThrow("Invalid email");
  });

  it("should throw an error if the user password is not provided", () => {
    expect(() => {
      const user = new User(
        "1",
        "John Doe",
        "email@email.com",
        "",
        "user",
        new Date(),
        new Date()
      );
    }).toThrow("User password is required");
  });

  it("should throw an error if the user password is invalid", () => {
    expect(() => {
      const user = new User(
        "1",
        "John Doe",
        "email@email.com",
        "1qaz3dwdw",
        "user",
        new Date(),
        new Date()
      );
    }).toThrow("Invalid password");
  });

  it("should throw an error if the user role is not provided", () => {
    expect(() => {
      const user = new User(
        "1",
        "John Doe",
        "email@email.com",
        "@QAZ123qaz",
        "",
        new Date(),
        new Date()
      );
    }).toThrow("User role is required");
  });

  it("should hash the user password correctly", async () => {
    const user = new User(
      "1",
      "John Doe",
      "test@email.com",
      "@QAZ123qaz",
      "user",
      new Date(),
      new Date()
    );

    const originalPassword = user.password;
    await user.hashPassword();
    const hashedPassword = user.password;

    expect(hashedPassword).not.toBe(originalPassword);
    const isMatch = await bcrypt.compare(originalPassword, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it("should throw error when change for invalid role", () => {
    const user = new User(
      "1",
      "John Doe",
      "test@email.com",
      "@QAZ123qaz",
      "user",
      new Date(),
      new Date()
    );
    expect(() => {
      user.changeRole("invalid");
    }).toThrow("Invalid role");
  });
});

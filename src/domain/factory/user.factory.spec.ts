import UserFactory from "./user.factory";

describe("User factory unit tests", () => {
  it("should create a new user", () => {
    const user = UserFactory.create("name", "t@t.com", "@QAZ123qaz", "user");
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBe("name");
    expect(user.email).toBe("t@t.com");
    expect(user.password).toBe("@QAZ123qaz");
    expect(user.role).toBe("user");
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });

  it("should throw an error if the user role is invalid", () => {
    expect(() => {
      UserFactory.create("name", "t@t.com", "@QAZ123qaz", "invalid");
    }).toThrow("Invalid role");
  });
});

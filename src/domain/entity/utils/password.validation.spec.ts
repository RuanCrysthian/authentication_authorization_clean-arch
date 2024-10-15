import { validatePassword } from "./password.validation";

describe("Password Validation", () => {
  it("should return true for a valid password", () => {
    const validPassword = "Test@123";
    expect(validatePassword(validPassword)).toBe(true);
  });

  it("should return false for a password shorter than 6 characters", () => {
    const invalidPassword = "T@1";
    expect(validatePassword(invalidPassword)).toBe(false);
  });

  it("should return false for a password without an uppercase letter", () => {
    const invalidPassword = "test@123";
    expect(validatePassword(invalidPassword)).toBe(false);
  });

  it("should return false for a password without a number", () => {
    const invalidPassword = "Test@abc";
    expect(validatePassword(invalidPassword)).toBe(false);
  });

  it("should return false for a password without a special character", () => {
    const invalidPassword = "Test123";
    expect(validatePassword(invalidPassword)).toBe(false);
  });

  it("should return false for a password without any character", () => {
    const invalidPassword = "";
    expect(validatePassword(invalidPassword)).toBe(false);
  });

  it("should return false for a password with spaces", () => {
    const invalidPassword = "Test @123";
    expect(validatePassword(invalidPassword)).toBe(false);
  });
});

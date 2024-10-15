import { validateEmail } from "./email.validation";

describe("Email Validation", () => {
  it("should return true for a valid email", () => {
    const validEmail = "test@example.com";
    expect(validateEmail(validEmail)).toBe(true);
  });

  it("should return true for a valid email with subdomain", () => {
    const validEmail = "test@sub.example.com";
    expect(validateEmail(validEmail)).toBe(true);
  });

  it('should return false for an email without "@" symbol', () => {
    const invalidEmail = "testexample.com";
    expect(validateEmail(invalidEmail)).toBe(false);
  });

  it("should return false for an email without domain", () => {
    const invalidEmail = "test@";
    expect(validateEmail(invalidEmail)).toBe(false);
  });

  it("should return false for an email without top-level domain", () => {
    const invalidEmail = "test@example";
    expect(validateEmail(invalidEmail)).toBe(false);
  });

  it("should return false for an email with spaces", () => {
    const invalidEmail = " test@example.com ";
    expect(validateEmail(invalidEmail)).toBe(false);
  });

  it("should return false for an empty string", () => {
    const invalidEmail = "";
    expect(validateEmail(invalidEmail)).toBe(false);
  });

  it("should return false for an email with invalid characters", () => {
    const invalidEmail = "test@exam$ple.com";
    expect(validateEmail(invalidEmail)).toBe(false);
  });
});

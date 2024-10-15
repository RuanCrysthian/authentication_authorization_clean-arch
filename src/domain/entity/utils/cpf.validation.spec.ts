import { validateCPF } from "./cpf.validation";

describe("CPF Validation", () => {
  it("should return true for a valid CPF", () => {
    const validCPF = "123.456.789-09";
    expect(validateCPF(validCPF)).toBe(true);
  });

  it("should return false for a CPF with incorrect format", () => {
    const invalidCPF = "123.456.789";
    expect(validateCPF(invalidCPF)).toBe(false);
  });

  it("should return false for a CPF with all digits equal", () => {
    const invalidCPF = "111.111.111-11";
    expect(validateCPF(invalidCPF)).toBe(false);
  });

  it("should return false for a CPF with an invalid checksum (first digit)", () => {
    const invalidCPF = "123.456.789-19";
    expect(validateCPF(invalidCPF)).toBe(false);
  });

  it("should return false for a CPF with an invalid checksum (second digit)", () => {
    const invalidCPF = "123.456.789-08";
    expect(validateCPF(invalidCPF)).toBe(false);
  });

  it("should return false for a CPF containing non-numeric characters", () => {
    const invalidCPF = "123abc456def";
    expect(validateCPF(invalidCPF)).toBe(false);
  });

  it("should return false for a CPF with more than 11 digits", () => {
    const invalidCPF = "123.456.789-090";
    expect(validateCPF(invalidCPF)).toBe(false);
  });

  it("should return true for a valid CPF without formatting", () => {
    const validCPF = "12345678909";
    expect(validateCPF(validCPF)).toBe(true);
  });
});

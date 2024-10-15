export function validateCPF(cpf: string): boolean {
  const cleanCPF = cleanUpCPF(cpf);

  if (!hasValidFormat(cleanCPF)) return false;
  if (allDigitsAreEqual(cleanCPF)) return false;

  const firstDigit = calculateDigit(cleanCPF, 10);
  const secondDigit = calculateDigit(cleanCPF, 11);

  return cleanCPF.endsWith(`${firstDigit}${secondDigit}`);
}

function cleanUpCPF(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

function hasValidFormat(cpf: string): boolean {
  return cpf.length === 11;
}

function allDigitsAreEqual(cpf: string): boolean {
  return cpf.split("").every((digit) => digit === cpf[0]);
}

function calculateDigit(cpf: string, initialWeight: number): number {
  let sum = 0;

  for (let i = 0; i < initialWeight - 1; i++) {
    sum += parseInt(cpf[i]) * (initialWeight - i);
  }

  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

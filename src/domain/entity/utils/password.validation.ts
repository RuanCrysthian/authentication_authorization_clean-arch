export function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{6,}$/;
  return passwordRegex.test(password);
}

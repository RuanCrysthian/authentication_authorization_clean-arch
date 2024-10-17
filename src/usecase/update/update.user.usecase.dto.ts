export default interface InputUpdateUserUseCaseDto {
  id: string;
  name: string;
  email: string;
}

export interface OutputUpdateUserUseCaseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

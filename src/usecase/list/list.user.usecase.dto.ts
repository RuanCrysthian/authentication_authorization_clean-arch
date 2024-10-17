export interface InputListUserUseCaseDto {}

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface OutputListUserUseCaseDto {
  users: User[];
}

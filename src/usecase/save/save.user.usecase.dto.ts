export interface InputSaveUserUseCase {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface OutputSaveUserUseCase {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

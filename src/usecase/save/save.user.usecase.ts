import UserFactory from "../../domain/factory/user.factory";
import UserRepositoryInterface from "../../domain/repository/user.repository.interface";
import {
  InputSaveUserUseCase,
  OutputSaveUserUseCase,
} from "./save.user.usecase.dto";

export default class SaveUserUseCase {
  private _repository: UserRepositoryInterface;

  constructor(repository: UserRepositoryInterface) {
    this._repository = repository;
  }

  async execute(input: InputSaveUserUseCase): Promise<OutputSaveUserUseCase> {
    const user = UserFactory.create(
      input.name,
      input.email,
      input.password,
      input.role
    );
    await user.hashPassword();
    await this._repository.save(user);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

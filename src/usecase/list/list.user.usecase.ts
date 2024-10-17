import UserRepositoryInterface from "../../domain/repository/user.repository.interface";
import {
  InputListUserUseCaseDto,
  OutputListUserUseCaseDto,
} from "./list.user.usecase.dto";

export default class ListUserUseCase {
  private _userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this._userRepository = userRepository;
  }

  async execute(
    input: InputListUserUseCaseDto
  ): Promise<OutputListUserUseCaseDto> {
    const users = await this._userRepository.list();
    return {
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
    };
  }
}

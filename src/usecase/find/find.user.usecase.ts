import UserRepositoryInterface from "../../domain/repository/user.repository.interface";
import {
  InputFindUserByIdUseCase,
  OutputFindUserByIdUseCase,
} from "./find.user.usecase.dto";

export default class FindUserUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async execute(
    input: InputFindUserByIdUseCase
  ): Promise<OutputFindUserByIdUseCase> {
    const user = await this.userRepository.findById(input.id);
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

import UserRepositoryInterface from "../../domain/repository/user.repository.interface";
import InputDeleteUserUseCaseDto, {
  OutputDeleteUserUseCaseDto,
} from "./delete.user.usecase.dto";

export default class DeleteUserUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async execute(
    input: InputDeleteUserUseCaseDto
  ): Promise<OutputDeleteUserUseCaseDto> {
    await this.userRepository.delete(input.id);
    return {};
  }
}

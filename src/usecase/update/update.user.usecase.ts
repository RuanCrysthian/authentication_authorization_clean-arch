import UserRepositoryInterface from "../../domain/repository/user.repository.interface";
import InputUpdateUserUseCaseDto, {
  OutputUpdateUserUseCaseDto,
} from "./update.user.usecase.dto";

export default class UpdateUserUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async execute(
    input: InputUpdateUserUseCaseDto
  ): Promise<OutputUpdateUserUseCaseDto> {
    const user = await this.userRepository.findById(input.id);
    user.changeName(input.name);
    user.changeEmail(input.email);
    await this.userRepository.update(user);
    const updatedUser = await this.userRepository.findById(input.id);
    return {
      id: user.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }
}

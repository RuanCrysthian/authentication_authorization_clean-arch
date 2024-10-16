import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepositoryInterface from "../../domain/repository/user.repository.interface";
import {
  InputLoginUserDto,
  OutputLoginUserDto,
} from "./login.user.usecase.dto";

export default class LoginUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async execute(input: InputLoginUserDto): Promise<OutputLoginUserDto> {
    const user = await this.userRepository.findByEmail(input.email);
    const isPasswordValid = await this.verifyPassword(
      input.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );
    return { token: token };
  }

  private async verifyPassword(
    password: string,
    userPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }
}

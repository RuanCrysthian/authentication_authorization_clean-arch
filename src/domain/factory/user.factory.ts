import { v4 as uuidv4 } from "uuid";
import User from "../entity/user.entity";
export default class UserFactory {
  public static create(
    name: string,
    email: string,
    password: string,
    role: string
  ): User {
    if (role !== "user" && role !== "admin") {
      throw new Error("Invalid role");
    }

    return new User(
      uuidv4(),
      name,
      email,
      password,
      role,
      new Date(),
      new Date()
    );
  }
}

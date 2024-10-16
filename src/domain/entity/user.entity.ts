import bcrypt from "bcryptjs";
import { validateEmail } from "./utils/email.validation";
import { validatePassword } from "./utils/password.validation";

export default class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _role: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._role = role;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this.validate();
  }

  validate(): void {
    if (this._id.length === 0) {
      throw new Error("User ID is required");
    }
    if (this._name.length === 0) {
      throw new Error("User name is required");
    }
    if (this._email.length === 0) {
      throw new Error("User email is required");
    }
    if (!validateEmail(this._email)) {
      throw new Error("Invalid email");
    }
    if (this._password.length === 0) {
      throw new Error("User password is required");
    }
    if (!validatePassword(this._password)) {
      throw new Error("Invalid password");
    }
    if (this._role.length === 0) {
      throw new Error("User role is required");
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get role(): string {
    return this._role;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changeEmail(email: string): void {
    this._email = email;
    this.validate();
  }

  changeRole(role: string): void {
    if (role.length === 0 || (role !== "user" && role !== "admin")) {
      throw new Error("Invalid role");
    }
    this._role = role;
    this.validate();
  }

  async hashPassword(): Promise<void> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(this._password, salt);
    this._password = hashedPassword;
  }
}

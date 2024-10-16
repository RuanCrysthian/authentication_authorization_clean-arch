import { UniqueConstraintError } from "sequelize";
import User from "../../../domain/entity/user.entity";
import UserRepositoryInterface from "../../../domain/repository/user.repository.interface";
import UserModel from "./user.model";

export default class UserRepository implements UserRepositoryInterface {
  async save(user: User): Promise<void> {
    try {
      await UserModel.create({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new Error("Email already exists");
      }
    }
  }

  async findByEmail(email: string): Promise<User> {
    const userModel = await UserModel.findOne({ where: { email } });
    if (!userModel) {
      throw new Error("User not found");
    }
    return new User(
      userModel.id,
      userModel.name,
      userModel.email,
      userModel.password,
      userModel.role,
      userModel.createdAt,
      userModel.updatedAt
    );
  }

  async findById(id: string): Promise<User> {
    const userModel = await UserModel.findOne({ where: { id } });
    if (!userModel) {
      throw new Error("User not found");
    }
    return new User(
      userModel.id,
      userModel.name,
      userModel.email,
      userModel.password,
      userModel.role,
      userModel.createdAt,
      userModel.updatedAt
    );
  }

  async update(user: User): Promise<void> {
    try {
      const [updatedRows] = await UserModel.update(
        {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
          updatedAt: new Date(),
        },
        { where: { id: user.id } }
      );
      if (updatedRows === 0) {
        throw new Error("User not found");
      }
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new Error("Email already exists");
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const deletedRows = await UserModel.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new Error("User not found");
    }
  }

  async list(): Promise<User[]> {
    const userModels = await UserModel.findAll();
    return userModels.map(
      (userModel) =>
        new User(
          userModel.id,
          userModel.name,
          userModel.email,
          userModel.password,
          userModel.role,
          userModel.createdAt,
          userModel.updatedAt
        )
    );
  }
}

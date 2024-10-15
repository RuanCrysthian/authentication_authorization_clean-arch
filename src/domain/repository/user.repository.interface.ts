import User from "../entity/user.entity";

export default interface UserRepositoryInterface {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<User[]>;
}

import EventDispatcherInterface from "../../domain/event/event.dispatcher.interface";
import SendEmailWhenUserIsCreatedHandler from "../../domain/event/handler/send.email.when.user.is.created.handler";
import UserCreatedEvent from "../../domain/event/user.created.event";
import UserFactory from "../../domain/factory/user.factory";
import UserRepositoryInterface from "../../domain/repository/user.repository.interface";
import {
  InputSaveUserUseCase,
  OutputSaveUserUseCase,
} from "./save.user.usecase.dto";

export default class SaveUserUseCase {
  private _repository: UserRepositoryInterface;
  private _eventDispatcher: EventDispatcherInterface;

  constructor(
    repository: UserRepositoryInterface,
    eventDispatcher: EventDispatcherInterface
  ) {
    this._repository = repository;
    this._eventDispatcher = eventDispatcher;
    this.registerSendEmailEvent();
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
    const userCreatedEvent = new UserCreatedEvent({
      userName: user.name,
      userEmail: user.email,
    });
    this._eventDispatcher.notify(userCreatedEvent);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private registerSendEmailEvent(): void {
    const sendEmailWhenUserIsCreatedHandler =
      new SendEmailWhenUserIsCreatedHandler();
    this._eventDispatcher.register(
      "UserCreatedEvent",
      sendEmailWhenUserIsCreatedHandler
    );
  }
}

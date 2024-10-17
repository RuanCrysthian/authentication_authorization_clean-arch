jest.mock("nodemailer");

import nodemailer from "nodemailer";
import EventDispatcher from "./event.dispatcher";
import SendEmailWhenUserIsCreatedHandler from "./handler/send.email.when.user.is.created.handler";
import UserCreatedEvent from "./user.created.event";

// Mockar o createTransport
const sendMailMock = jest.fn();
nodemailer.createTransport = jest.fn().mockReturnValue({
  sendMail: sendMailMock,
});

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenUserIsCreatedHandler();

    eventDispatcher.register("UserCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["UserCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["UserCreatedEvent"].length).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["UserCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenUserIsCreatedHandler();

    eventDispatcher.register("UserCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["UserCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("UserCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["UserCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["UserCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenUserIsCreatedHandler();

    eventDispatcher.register("UserCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["UserCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["UserCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenUserIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("UserCreatedEvent", eventHandler);

    const userCreatedEvent = new UserCreatedEvent({
      userName: "John Doe",
      userEmail: "test@email.com",
    });

    eventDispatcher.notify(userCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(sendMailMock).toHaveBeenCalled(); // Certificar-se de que o e-mail foi "enviado"
  });

  it("should handle errors when sending email", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenUserIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("UserCreatedEvent", eventHandler);
    sendMailMock.mockRejectedValueOnce(new Error("Failed to send email"));
    const userCreatedEvent = new UserCreatedEvent({
      userName: "John Doe",
      userEmail: "test@email.com",
    });
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    await eventDispatcher.notify(userCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(sendMailMock).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error sending email:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });
});

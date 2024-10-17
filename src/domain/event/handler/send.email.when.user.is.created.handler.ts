import nodemailer from "nodemailer";
import EventHandlerInterface from "../event.handler.interface";
import UserCreatedEvent from "../user.created.event";

export default class SendEmailWhenUserIsCreatedHandler
  implements EventHandlerInterface<UserCreatedEvent>
{
  async handle(event: UserCreatedEvent): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILHOG_HOST || "localhost",
      port: parseInt(process.env.MAILHOG_PORT || "1025"),
      secure: false,
      auth: null,
    });

    const mailOptions = {
      from: '"MyApp" <no-reply@myapp.com>',
      to: event.eventData.userEmail,
      subject: "Welcome to MyApp!",
      text: `Hello ${event.eventData.userName}, welcome to MyApp!`,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log(
        `Email sent to ${event.eventData.userName}, email: ${event.eventData.userEmail}`
      );
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

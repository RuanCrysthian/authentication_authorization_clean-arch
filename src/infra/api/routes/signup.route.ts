import express, { Request, Response } from "express";
import EventDispatcher from "../../../domain/event/event.dispatcher";
import SaveUserUseCase from "../../../usecase/save/save.user.usecase";
import UserRepository from "../../repository/sequelize/user.repository.sequelize";

export const signupRoute = express.Router();

signupRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new SaveUserUseCase(
    new UserRepository(),
    new EventDispatcher()
  );
  try {
    const input = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    const output = await useCase.execute(input);
    res.status(201).send(output);
  } catch (error) {
    res.status(400).send(error);
  }
});

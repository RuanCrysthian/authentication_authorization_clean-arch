import express, { Request, Response } from "express";
import LoginUseCase from "../../../usecase/login/login.user.usecase";
import UserRepository from "../../repository/sequelize/user.repository.sequelize";

export const loginRoute = express.Router();

loginRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new LoginUseCase(new UserRepository());
  try {
    const input = {
      email: req.body.email,
      password: req.body.password,
    };
    const output = await useCase.execute(input);
    res.status(200).send(output);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

import express, { Request, Response } from "express";
import FindUserUseCase from "../../../usecase/find/find.user.usecase";
import UserRepository from "../../repository/sequelize/user.repository.sequelize";
import { authMiddleware } from "../authentication.middleware";
import { authorizationMiddleware } from "../authorization.middleware";

export const userRouter = express.Router();

userRouter.get(
  "/:id",
  authMiddleware,
  authorizationMiddleware(["admin", "user"]),
  async (req: Request, res: Response) => {
    const useCase = new FindUserUseCase(new UserRepository());
    try {
      const input = { id: req.params.id };
      const output = await useCase.execute(input);
      res.status(200).json(output);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).send({ message: error.message });
        return;
      }
      res.status(500).send(error);
    }
  }
);

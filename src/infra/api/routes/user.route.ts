import express, { Request, Response } from "express";
import DeleteUserUseCase from "../../../usecase/delete/delete.user.usecase";
import FindUserUseCase from "../../../usecase/find/find.user.usecase";
import ListUserUseCase from "../../../usecase/list/list.user.usecase";
import UpdateUserUseCase from "../../../usecase/update/update.user.usecase";
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

userRouter.get(
  "/",
  authMiddleware,
  authorizationMiddleware(["admin"]),
  async (req: Request, res: Response) => {
    const useCase = new ListUserUseCase(new UserRepository());
    try {
      const output = await useCase.execute({});
      res.status(200).send(output);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

userRouter.delete(
  "/:id",
  authMiddleware,
  authorizationMiddleware(["admin"]),
  async (req: Request, res: Response) => {
    const useCase = new DeleteUserUseCase(new UserRepository());
    try {
      const input = { id: req.params.id };
      await useCase.execute(input);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).send({ message: error.message });
        return;
      }
      res.status(500).send(error);
    }
  }
);

userRouter.put(
  "/:id",
  authMiddleware,
  authorizationMiddleware(["admin"]),
  async (req: Request, res: Response) => {
    const useCase = new UpdateUserUseCase(new UserRepository());
    try {
      const input = {
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
      };
      const output = await useCase.execute(input);
      res.status(200).send(output);
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        res.status(404).send({ message: error.message });
        return;
      }
      if (error instanceof Error && error.message === "Invalid email") {
        res.status(400).send({ message: error.message });
        return;
      }
      if (error instanceof Error && error.message === "Invalid name") {
        res.status(400).send({ message: error.message });
        return;
      }
      if (error instanceof Error && error.message === "Email already exists") {
        res.status(409).send({ message: error.message });
        return;
      }
      res.status(500).send(error);
    }
  }
);

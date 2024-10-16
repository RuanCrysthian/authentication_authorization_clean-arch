import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import UserModel from "../repository/sequelize/user.model";
import { loginRoute } from "./routes/login.route";
import { signupRoute } from "./routes/signup.route";

export const app: Express = express();
app.use(express.json());
app.use("/signup", signupRoute);
app.use("/login", loginRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST, // Host do banco de dados
    username: process.env.DB_USER, // Nome de usuário do banco de dados
    password: process.env.DB_PASSWORD, // Senha do banco de dados
    database: process.env.DB_NAME, // Nome do banco de dados
    logging: false,
  });
  sequelize.addModels([UserModel]);
  await sequelize.sync();
}
setupDb();

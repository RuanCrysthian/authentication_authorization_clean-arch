import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import UserModel from "../repository/sequelize/user.model";
import { loginRoute } from "./routes/login.route";
import { signupRoute } from "./routes/signup.route";
import { testRoute } from "./routes/test.route";

export const app: Express = express();
app.use(express.json());
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/test", testRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
  });
  sequelize.addModels([UserModel]);
  await sequelize.sync();
}
setupDb();

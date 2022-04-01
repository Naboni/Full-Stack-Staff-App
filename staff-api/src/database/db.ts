import { Sequelize } from "sequelize";

export const db = new Sequelize("staff", "root", "Bonny1219!", {
  dialect: "mysql",
  port: 3306,
  logging: false,
});

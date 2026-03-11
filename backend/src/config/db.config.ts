import "reflect-metadata";
import { DataSource } from "typeorm";

import "dotenv/config";


const isProduction = process.env.NODE_ENV === "production";
console.log("databasename",process.env.DB_NAME)
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: false, // true in dev, false in prod
  // logging: !isProduction, // true in dev, false in prod

  entities: [__dirname + "/../entities/*{.ts,.js}"],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  migrationsRun: isProduction, // automatically run migrations in prod if desired
});

export default AppDataSource;
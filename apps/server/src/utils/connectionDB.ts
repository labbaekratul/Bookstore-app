import { Transactions } from "../entities/Transaction";
import { Book } from "../entities/Book";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "bookstore",
  password: "postgres",
  database: "bookstore_db",
  synchronize: true,
  entities: [Book, Transactions],
});

const Connection = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("DB Connectd");
    })
    .catch((e) => {
      console.log(e);
    });
};

export default Connection;

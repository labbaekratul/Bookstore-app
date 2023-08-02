import {
  addBook,
  buyBooks,
  getAllBooks,
  getBook,
  seedingBooks,
} from "../controllers/bookController";
import express from "express";

const bookRouter = express.Router();

bookRouter.get("/seed", seedingBooks);
bookRouter.post("/buy", buyBooks);
bookRouter.get("/:bookId", getBook);
bookRouter.route("/").get(getAllBooks).post(addBook);

export default bookRouter;

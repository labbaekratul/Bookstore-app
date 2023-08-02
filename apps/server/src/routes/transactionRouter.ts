import { getTransactions } from "../controllers/transactionController";
import express from "express";

const transactionRouter = express.Router();

transactionRouter.get("/", getTransactions);

export default transactionRouter;

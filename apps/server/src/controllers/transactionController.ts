/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API endpoints for managing transactions
 */

import { Request, Response } from "express";
import { TransactionService } from "../services/transactionService";

const transactionService = new TransactionService();

/**
 * @swagger
 * /api/tansaction:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: List of transactions
 *       500:
 *         description: Internal server error
 */

export const getTransactions = async (_req: Request, res: Response) => {
  try {
    const transactions = await transactionService.getTransactions();
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

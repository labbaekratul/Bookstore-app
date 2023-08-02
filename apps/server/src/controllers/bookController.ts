import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { bookSchema, transactionSchema } from "../utils/validator";
import { validator } from "../utils/helper";

const bookService = new BookService();

/**
 * @swagger
 * /api/book:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 *       500:
 *         description: Internal server error
 */

export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/book/{bookId}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the book to fetch
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

export const getBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await bookService.getBook(bookId as string);
    if (!book) return res.status(404).json({ error: "Book not found" });
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/books/seed:
 *   get:
 *     summary: Seed books data
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Success message
 *       500:
 *         description: Internal server error
 */

export const seedingBooks = async (_req: Request, res: Response) => {
  try {
    const books = await bookService.seedingBooks();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * @swagger
 * /api/book:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Created book details
 *       400:
 *         description: Invalid book data
 *       500:
 *         description: Internal server error
 */

export const addBook = async (req: Request, res: Response) => {
  const inputData = req.body;
  try {
    const error = validator(bookSchema, inputData);
    if (error) return res.status(400).json(error);
    const books = await bookService.addBook(req.body);
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/book/buy:
 *   post:
 *     summary: Buy books using transaction
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionDTO'
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Invalid transaction data
 *       500:
 *         description: Internal server error
 */

export const buyBooks = async (req: Request, res: Response) => {
  const bookPurchases = req.body;
  try {
    const error = validator(transactionSchema, bookPurchases);
    if (error) return res.status(400).json(error);
    const result = await bookService.buyBooks(bookPurchases);
    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

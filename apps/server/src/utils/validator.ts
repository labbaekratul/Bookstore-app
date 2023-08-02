import { number, object, string } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     BookSchema:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Book title
 *         description:
 *           type: string
 *           description: Book description
 *         image:
 *           type: string
 *           description: URL of the book image
 *         discount:
 *           type: number
 *           format: int32
 *           description: Book discount (should be between 1 and 99)
 *         price:
 *           type: number
 *           format: double
 *           description: Book price (should be a positive number)
 *         quantity:
 *           type: number
 *           format: int32
 *           description: Book quantity (should be between 1 and 100 and a positive number)
 */

export const bookSchema = {
  body: object({
    title: string().nonempty("Title cannot be empty"),
    description: string().nonempty("Description cannot be empty"),
    image: string().url().nonempty("Image cannot be empty"),
    discount: number()
      .int()
      .min(1)
      .max(99, "Discount must be between 1 and 99"),
    price: number().positive("Price must be a positive number"),
    quantity: number({ required_error: "Book quantity is require" })
      .min(1)
      .max(100)
      .positive("Book quantity must be a positive number"),
  }),
};

/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionSchema:
 *       type: object
 *       properties:
 *         bookId:
 *           type: number
 *           format: int32
 *           description: ID of the book to buy
 *         quantity:
 *           type: number
 *           format: int32
 *           description: Quantity of books to buy (should be between 1 and 100 and a positive number)
 */

export const transactionSchema = {
  body: object({
    bookId: number({ required_error: "Book ID is require" }).positive(
      "Book ID must be a valid id"
    ),
    quantity: number({ required_error: "Book quantity is require" })
      .min(1)
      .max(100)
      .positive("Book quantity must be a positive number"),
  }),
};

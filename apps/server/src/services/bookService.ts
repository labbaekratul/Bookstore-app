import { data } from "../utils/data";
import { Book } from "../entities/Book";
import { AppDataSource } from "../utils/connectionDB";
import { Repository } from "typeorm";
import { BookInputs, BookPurchase, BookQuery } from "utils/interfaces";
import { Transactions } from "../entities/Transaction";

export class BookService {
  private bookRepository: Repository<Book>;
  transactionRepository: Repository<Transactions>;

  constructor() {
    this.bookRepository = AppDataSource.getRepository(Book);
    this.transactionRepository = AppDataSource.getRepository(Transactions);
  }

  getAllBooks(query: BookQuery): Promise<Book[]> {
    const { page, perPage } = query;
    const skipItems = (Number(page) - 1) * Number(perPage);
    return this.bookRepository.find({
      relations: ["transactions"],
      skip: skipItems,
      take: Number(perPage),
    });
  }

  getBook(id: string): Promise<Book | null> {
    const bookId = parseInt(id);
    return this.bookRepository.findOne({
      where: { id: bookId },
    });
  }

  seedingBooks(): Promise<Book[]> {
    return this.bookRepository.save(data);
  }

  addBook(bookInput: BookInputs): Promise<Book> {
    const book = new Book();
    book.title = bookInput.title;
    book.description = bookInput.description;
    book.image = bookInput.image;
    book.discount = bookInput.discount;
    book.price = bookInput.price;
    return this.bookRepository.save(book);
  }

  async buyBooks({ bookId, quantity }: BookPurchase) {
    const Id = parseInt(bookId);
    const book: any = await this.bookRepository.findOne({
      where: { id: Id },
    });

    if (!book) {
      throw new Error(`Book with ID ${bookId} not found`);
    }
    if (book.quantity < quantity) {
      throw new Error(
        `Not enough quantity available for book with ID ${bookId}`
      );
    }
    book.quantity -= quantity;
    await this.bookRepository.save(book);
    const transactionData = new Transactions();
    transactionData.bookId = book.id;
    transactionData.quantity = quantity;
    transactionData.totalAmount = book.price * quantity;
    const transaction = await this.transactionRepository.save(transactionData);
    return transaction;
  }
}

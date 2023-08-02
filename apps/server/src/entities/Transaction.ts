import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Book } from "./Book";

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: number;

  @Column()
  quantity: number;

  @Column()
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Book, (book) => book.transactions) // Many-to-One relationship with Book entity
  @JoinColumn({ name: "bookId" }) // Join column with bookId in Transaction entity
  book: Book; // Property to store the related book
}

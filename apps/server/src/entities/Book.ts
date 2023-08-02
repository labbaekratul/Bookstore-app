import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Transactions } from "./Transaction";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  discount: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Transactions, (transaction) => transaction.book) // One-to-Many relationship with Transaction entity
  transactions: Transactions[]; // Property to store the related transactions
}

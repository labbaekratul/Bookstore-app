import { Transactions } from "../entities/Transaction";
import { Repository } from "typeorm";
import { AppDataSource } from "../utils/connectionDB";

export class TransactionService {
  private transactionRepository: Repository<Transactions>;
  constructor() {
    this.transactionRepository = AppDataSource.getRepository(Transactions);
  }

  getTransactions(): Promise<Transactions[]> {
    return this.transactionRepository.find({ relations: ["book"] });
  }
}

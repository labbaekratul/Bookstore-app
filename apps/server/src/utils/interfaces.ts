export interface BookInputs {
  title: string;
  description: string;
  image: string;
  discount: number;
  price: number;
}

export interface BookPurchase {
  bookId: string;
  quantity: number;
}

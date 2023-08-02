export interface BookInputs {
  title: string;
  description: string;
  image: string;
  discount: number;
  price: number;
}

export interface BookQuery {
  page: string;
  perPage: string;
}

export interface BookPurchase {
  bookId: string;
  quantity: number;
}

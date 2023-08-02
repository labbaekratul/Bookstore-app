import axios from "axios";
import { Book } from "../interfaces/mixin";

export async function fetchBooks(page: number): Promise<Book[]> {
  try {
    const response = await axios.get<Book[]>(`api/book?page=${page}&perPage=10`);
    return response.data;
  } catch (error) {
    console.log("Error fetching books:", error);
    throw error;
  }
}